import Head from "next/head";
import {
  getAllTags,
  getNumberOfPages,
  getPostsByPage,
  getPostsTopPage,
} from "@/lib/notionAPI";
import SinglePost from "@/components/Post/SinglePost";
import Pagination from "@/components/Pagination/Pagination";
import Tags from "@/components/Tags/Tags";
import Posts from "@/components/Post/Posts";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "ブログ記事一覧",
  description:
    "MaKe TECH Blogの全記事一覧です。Web開発、プログラミング、技術に関する記事を掲載しています。",
  keywords: ["ブログ記事", "Web開発", "プログラミング", "技術情報"],
};

type PageParam = {
  page: string;
};

export const generateStaticParams = async () => {
  const totalPageSize = await getNumberOfPages();
  let params: PageParam[] = [];
  for (let i = 1; i <= totalPageSize; i++) {
    params.push({ page: i.toString() });
  }

  return params;
};

type postParam = {
  title: string;
  date: string;
  page: string;
};

const BlogPageList = async ({ params }: { params: postParam }) => {
  const currentPage = params.page;
  const postsByPage = await getPostsByPage(
    parseInt(currentPage.toString(), 10)
  );
  const posts = await getPostsTopPage({ pageSize: 5 });
  const allTags = await getAllTags();
  const totalPageSize = await getNumberOfPages();
  return (
    <div>
      <Head>
        <title>Blog</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="container mx-auto w-full mt-14 px-4 md:px-8 lg:px-16">
        <header className="text-center my-8">
          <h1 className="text-4xl font-bold mb-4">All Blog Posts</h1>
        </header>
        <div className="md:flex">
          <div className="md:w-8/12 lg:w-9/12">
            <h2 className="border-b-2 border-border-primary mb-4">All Posts</h2>
            <section className="grid gap-6 lg:grid-cols-2">
              <Posts posts={postsByPage} />
            </section>
          </div>
          <div className="md:w-4/12 lg:w-3/12 mt-8 md:mt-0 md:ml-8">
            <h2 className="border-b-2 border-border-primary mb-4">Tags</h2>
            <Tags tags={allTags} />
          </div>
        </div>
        <Pagination
          numberOfPage={totalPageSize}
          currentPage={currentPage}
          tag=""
        />
      </div>
    </div>
  );
};

export default BlogPageList;
