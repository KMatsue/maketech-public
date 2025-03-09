import { cache } from "react";

import { NUMBER_OF_POSTS_PER_PAGE } from "@/constants/constants";
import { Client } from "@notionhq/client";
import { QueryDatabaseResponse } from "@notionhq/client/build/src/api-endpoints";
import { NotionToMarkdown } from "notion-to-md";
import { setOgp } from "./ogp";
import { Post } from "@/types/post";
import { BlockObject } from "@/types/notion";
import { normalizeTag } from "@/lib/stringUtils";

const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

const n2m = new NotionToMarkdown({ notionClient: notion });

export const getAllPosts = async () => {
  const posts: QueryDatabaseResponse = await notion.databases.query({
    database_id: process.env.NOTION_DATABASE_ID || "",
    filter: { property: "published", checkbox: { equals: true } },
    page_size: 100,
    sorts: [
      {
        property: "date",
        direction: "descending",
      },
    ],
  });

  const allPosts = posts.results;
  //   return allPosts;
  return allPosts.map((post) => {
    return getBlogPostMetaData(post);
  });
};

// ブログ記事用のメタデータ抽出
const getBlogPostMetaData = (post: any) => {
  const getTags = (tags: { name: string }[]) => {
    const allTags = tags.map((tag) => {
      return tag.name;
    });

    return allTags;
  };
  return {
    id: post.id,
    title: post.properties.name.title[0].plain_text,
    description: post.properties.description.rich_text[0].plain_text,
    date: post.properties.date.date.start,
    slug: post.properties.slug.rich_text[0].plain_text,
    tags: getTags(post.properties.tags.multi_select),
  };
};

// 静的ページ用のメタデータ抽出
const getPageMetaData = (page: any) => {
  // キーワードが存在する場合は抽出、ない場合は空配列
  const getKeywords = (keywords: any) => {
    if (!keywords || !keywords.multi_select) {
      return [];
    }

    return keywords.multi_select.map((keyword: { name: string }) => {
      return keyword.name;
    });
  };

  return {
    id: page.id,
    title: page.properties.name.title[0]?.plain_text || "ページタイトル",
    description: page.properties.description?.rich_text[0]?.plain_text || "",
    keywords: getKeywords(page.properties.keywords),
    slug: page.properties.slug?.rich_text[0]?.plain_text || "",
    published: page.properties.published?.checkbox || false,
    updatedAt: page.last_edited_time || "",
  };
};

/**
 * 投稿内容の取得
 * @param slug
 * @returns
 */
export const getSinglePost = async (slug: string) => {
  const response = await notion.databases.query({
    database_id: process.env.NOTION_DATABASE_ID || "",
    filter: {
      property: "slug",
      formula: {
        string: {
          equals: slug,
        },
      },
    },
  });
  const page = response.results[0];
  const metadata: Post = getBlogPostMetaData(page);

  const mdBlocks = await getBlocks(page.id);

  // typeがbookmarkのブロックの場合OGP情報を取得しセットする
  const blocks = await setOgp(mdBlocks);

  // console.log(`あいう${JSON.stringify(mdBlocks)}`);
  // const mdString = n2m.toMarkdownString(mdBlocks);

  return {
    metadata,
    markdown: blocks,
  };
};

/**
 * 投稿内容(ブロック)を取得する
 * @param blockId
 * @returns
 */
export const getBlocks = async (blockId: string): Promise<BlockObject[]> => {
  blockId = blockId.replaceAll("-", "");

  const { results } = await notion.blocks.children.list({
    block_id: blockId,
    page_size: 100,
  });

  const childBlocks: any = results.map(async (block) => {
    if ("type" in block) {
      if (block.has_children) {
        const children = await getBlocks(block.id);
        return { ...block, children };
      }
      return block;
    }
  });

  return await Promise.all(childBlocks).then((blocks) => {
    return blocks.reduce((acc, curr) => {
      if (curr.type === "bulleted_list_item") {
        if (acc[acc.length - 1]?.type === "bulleted_list") {
          acc[acc.length - 1][acc[acc.length - 1].type].children?.push(curr);
        } else {
          acc.push({
            id: getRandomInt(10 ** 99, 10 ** 100).toString(),
            type: "bulleted_list",
            bulleted_list: { children: [curr] },
          });
        }
      } else if (curr.type === "numbered_list_item") {
        if (acc[acc.length - 1]?.type === "numbered_list") {
          acc[acc.length - 1][acc[acc.length - 1].type].children?.push(curr);
        } else {
          acc.push({
            id: getRandomInt(10 ** 99, 10 ** 100).toString(),
            type: "numbered_list",
            numbered_list: { children: [curr] },
          });
        }
      } else {
        acc.push(curr);
      }
      return acc;
    }, []);
  });
};
const getRandomInt = (min: number, max: number) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

/**
 * 指定したブロックIDに対応するNotionのブロックを取得する
 *
 * @param blockId
 * @returns Notionのブロックオブジェクト
 * @throws Notionのブロック取得に失敗した場合
 *
 * @example
 * const block = await getBlockById("block_id");
 * if (block.type === "image") {
 *   // 画像ブロックの処理
 * }
 */
export const getBlockById = async (blockId: string) => {
  const block = await notion.blocks.retrieve({
    block_id: blockId,
  });
  return block;
};

/**
 * Topページ用
 * @param pageSize
 * @returns
 */
export const getPostsTopPage = async ({ pageSize }: { pageSize: number }) => {
  const allPosts = await getAllPosts();
  const fourPosts = allPosts.slice(0, pageSize);
  // console.log(fourPosts);
  return fourPosts;
};

/**
 * ページ番号に応じた記事取得
 * @param page
 * @returns
 */
export const getPostsByPage = async (page: number) => {
  const allPosts = await getAllPosts();

  const startIndex = (page - 1) * NUMBER_OF_POSTS_PER_PAGE;
  const endIndex = startIndex + NUMBER_OF_POSTS_PER_PAGE;

  return allPosts.slice(startIndex, endIndex);
};

/**
 * 記事の取得数に応じてページ数を算出し取得する
 * @returns ページ数
 */
export const getNumberOfPages = async () => {
  const allPosts = await getAllPosts();

  return (
    Math.floor(allPosts.length / NUMBER_OF_POSTS_PER_PAGE) +
    (allPosts.length % NUMBER_OF_POSTS_PER_PAGE > 0 ? 1 : 0)
  );
};

/**
 *
 * @param tagName
 * @param page
 * @returns
 */
export const getPostsByTagAndPage = async (tagName: string, page: number) => {
  const allPosts = await getAllPosts();
  const normalizedTagName = normalizeTag(tagName);
  const posts = allPosts.filter((post) =>
    post.tags.some((tag) => normalizeTag(tag) === normalizedTagName)
  );

  const startIndex = (page - 1) * NUMBER_OF_POSTS_PER_PAGE;
  const endIndex = startIndex + NUMBER_OF_POSTS_PER_PAGE;

  return posts.slice(startIndex, endIndex);
};

/**
 * 選択したタグが使われている投稿の件数に応じた、ページ数を返します。
 * @param tagName
 * @returns ページ数を返す
 */
export const getNumberOfPagesByTag = async (tagName: string) => {
  const allPosts = await getAllPosts();
  const normalizedTagName = normalizeTag(tagName);
  const posts = allPosts.filter((post) =>
    post.tags.some((tag) => normalizeTag(tag) === normalizedTagName)
  );

  return (
    Math.floor(posts.length / NUMBER_OF_POSTS_PER_PAGE) +
    (posts.length % NUMBER_OF_POSTS_PER_PAGE > 0 ? 1 : 0)
  );
};

/**
 * 全投稿で使われているタグの種類を抽出して返す
 * @returns タグの種類を[]で返す
 */
export const getAllTags = cache(async () => {
  const allPosts = await getAllPosts();

  const allTagsDuplicationLists = allPosts.flatMap((post) => post.tags);
  const set = new Set(allTagsDuplicationLists);
  const allTagsList = Array.from(set);
  // console.log(allTagsList);

  return allTagsList;
});

export const getPageByIdentifier2 = async (identifier: string) => {
  const response: QueryDatabaseResponse = await notion.databases.query({
    database_id: "1b0062f1a3b48086aa42ef48a35a883a",
    filter: {
      property: "slug",
      rich_text: {
        // プロパティの型に合わせて"rich_text"を使用
        equals: identifier,
      },
    },
  });

  if (response.results.length === 0) {
    return null;
  }

  const page = response.results[0];
  const metadata = getPageMetaData(page);
  const mdBlocks = await getBlocks(page.id);
  const blocks = await setOgp(mdBlocks);

  return {
    metadata,
    blocks,
  };
};

export const getPageByIdentifier = async (identifier: string) => {
  const response = await notion.databases.query({
    database_id: process.env.NOTION_PAGES_DATABASE_ID || "",
    filter: {
      property: "slug",
      rich_text: {
        equals: identifier,
      },
    },
  });

  if (response.results.length === 0) {
    return null;
  }

  const page = response.results[0];
  const metadata = getPageMetaData(page);

  // ここが重要: ブログ記事と同じ形式のデータを返す
  const mdBlocks = await getBlocks(page.id);

  // この部分をブログ記事と同じ処理にする
  // getSinglePost関数内ではこの後にsetOgpが呼ばれている
  const blocks = await setOgp(mdBlocks);

  return {
    metadata,
    markdown: blocks, // ここをmarkdownに変更（ブログ記事と同じ形式）
  };
};
