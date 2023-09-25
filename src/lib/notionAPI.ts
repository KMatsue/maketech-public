import { NUMBER_OF_POSTS_PER_PAGE } from "@/constants/constants";
import { Client } from "@notionhq/client";
import { QueryDatabaseResponse } from "@notionhq/client/build/src/api-endpoints";
import { NotionToMarkdown } from "notion-to-md";

declare type ElementType<T> = T extends (infer U)[] ? U : never;

declare type MatchType<T, U, V = never> = T extends U ? T : V;

export type BlockObject = MatchType<
  ElementType<
    Awaited<ReturnType<Client["blocks"]["children"]["list"]>>["results"]
  >,
  {
    type: unknown;
  }
>;
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
    return getPageMetaData(post);
  });
};

const getPageMetaData = (post: any) => {
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
  const metadata = getPageMetaData(page);
  // console.log(metadata);
  // const mdBlocks = await n2m.pageToMarkdown(page.id);
  const mdBlocks = await getBlocks(page.id);

  console.log(`あいう${JSON.stringify(mdBlocks)}`);
  // const mdString = n2m.toMarkdownString(mdBlocks);
  // console.log(mdString.parent);

  return {
    metadata,
    markdown: mdBlocks,
  };
};

// export const getPage = async (pageId: string) => {
//   const response = await notion.pages.retrieve({ page_id: pageId });
//   console.log(response);
//   return response;
// };

export const getBlocks = async (blockId: string): Promise<BlockObject[]> => {
  blockId = blockId.replaceAll("-", "");

  const { results } = await notion.blocks.children.list({
    block_id: blockId,
    page_size: 100,
  });

  // Fetches all child blocks recursively - be mindful of rate limits if you have large amounts of nested blocks
  // See https://developers.notion.com/docs/working-with-page-content#reading-nested-blocks
  const childBlocks: any = results.map(async (block) => {
    if (block.has_children) {
      const children = await getBlocks(block.id);
      return { ...block, children };
    }
    return block;
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
// export const getBlocks = async (blockId: string) => {
//   const blocks = [];
//   let cursor;
//   while (true) {
//     const { results, next_cursor } = await notion.blocks.children.list({
//       start_cursor: cursor,
//       block_id: blockId,
//     });
//     blocks.push(...results);
//     if (!next_cursor) {
//       break;
//     }
//     cursor = next_cursor;
//   }
//   return blocks;
// };

/**
 * Topページ用
 * @param pageSize
 * @returns
 */
export const getPostsForTopPage = async (pageSize: number) => {
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
  const posts = allPosts.filter((post) =>
    post.tags.find((tag: string) => tag === tagName)
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
  const posts = allPosts.filter((post) =>
    post.tags.find((tag: string) => tag === tagName)
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
export const getAllTags = async () => {
  const allPosts = await getAllPosts();

  const allTagsDuplicationLists = allPosts.flatMap((post) => post.tags);
  const set = new Set(allTagsDuplicationLists);
  const allTagsList = Array.from(set);
  // console.log(allTagsList);

  return allTagsList;
};
