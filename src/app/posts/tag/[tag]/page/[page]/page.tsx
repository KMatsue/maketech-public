import Head from "next/head";
import {
  getAllTags,
  getNumberOfPagesByTag,
  getPostsByTagAndPage,
} from "@/lib/notionAPI";
import SinglePost from "@/components/Post/SinglePost";
import Pagination from "@/components/Pagination/Pagination";
import Tags from "@/components/Tags/Tags";
import Posts from "@/components/Post/Posts";
import { normalizeTag } from "@/lib/stringUtils";
import { Metadata } from "next";

export const generateMetadata = async ({
  params,
}: {
  params: { tag: string; page: string };
}): Promise<Metadata> => {
  const tag = decodeURIComponent(params.tag);
  return {
    title: `${tag}に関する記事`,
    description: `${tag}に関連するWeb開発、プログラミング、技術情報の記事一覧です。`,
    keywords: [tag, "Web開発", "プログラミング", "技術情報"],
  };
};

export const generateStaticParams = async () => {
  const allTags = await getAllTags();
  let params: TagAndPageParam[] = [];

  type TagAndPageParam = {
    tag: string;
    page: string;
  };

  await Promise.all(
    allTags.map(async (tag: string) => {
      return await getNumberOfPagesByTag(tag).then(
        (totalPageSizeByTag: number) => {
          for (let i = 1; i <= totalPageSizeByTag; i++) {
            params.push({ tag: tag, page: i.toString() });
          }
        }
      );
    })
  );

  return params;
};

const BlogTagPageList = async ({
  params,
}: {
  params: { tag: string; page: string };
}) => {
  const currentPage = params?.page ? params.page.toString() : "1";
  const currentTag = params?.tag
    ? decodeURIComponent(params.tag.toString())
    : "";

  const displayTag = currentTag.charAt(0).toUpperCase() + currentTag.slice(1);

  // 検索用のタグ（正規化された形式）
  const normalizedTag = normalizeTag(currentTag);

  const posts = await getPostsByTagAndPage(
    normalizedTag,
    parseInt(currentPage)
  );
  const allTags = await getAllTags();
  const totalPageSizeByTag = await getNumberOfPagesByTag(normalizedTag);
  return (
    <div>
      <Head>
        <title>Blog</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container w-full mt-14 mx-auto px-4 md:px-8 lg:px-16">
        <header className="text-center my-8">
          <h1 className="text-4xl font-bold mb-4">
            {`Search tags in ${displayTag}`}
          </h1>
        </header>
        <div className="md:flex">
          <div className="md:w-8/12 lg:w-9/12">
            <h2 className="border-b-2 border-gray-500 mb-4">Posts</h2>
            <section className="grid gap-4 md:gap-6 grid-cols-1 md:grid-cols-2">
              <Posts posts={posts} />
            </section>
          </div>
          <div className="md:w-4/12 lg:w-3/12 mt-8 md:mt-0 md:ml-8">
            <h2 className="border-b-2 border-gray-500 mb-4">Tags</h2>
            <Tags tags={allTags} />
          </div>
        </div>
        <Pagination
          numberOfPage={totalPageSizeByTag}
          currentPage={currentPage}
          tag={currentTag}
        />
      </main>
    </div>
  );
};

export default BlogTagPageList;
