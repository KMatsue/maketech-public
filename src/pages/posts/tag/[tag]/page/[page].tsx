import Head from "next/head";
import {
  getNumberOfPages,
  getNumberOfPagesByTag,
  getPostsByPage,
  getPostsByTagAndPage,
} from "@/lib/notionAPI";
import SinglePost from "@/components/Post/SinglePost";
import { GetStaticPaths, GetStaticProps } from "next";
import Pagination from "@/components/Pagination/Pagination";

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [{ params: { tag: "blog", page: "1" } }],
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const currentPage = context.params?.page.toString();
  const currentTag = context.params?.tag.toString();
  const posts = await getPostsByTagAndPage(currentTag, parseInt(currentPage));
  const totalPageSize = await getNumberOfPagesByTag(currentTag);
  return {
    props: { posts, totalPageSize },
    revalidate: 60,
  };
};

const BlogTagPageList = ({ posts, totalPageSize }) => {
  // console.log(allPosts);

  return (
    <div className="container h-full w-full mx-auto">
      <Head>
        <title>Next.js-Notion-Blog</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container w-full mt-16">
        <h1 className="text-5xl font-medium text-center mb-16">
          Notion Blog🚀
        </h1>
        <section className="md:grid grid-cols-2 w-5/6 gap-3 mx-auto">
          {posts.map((post, index: number) => (
            <div key={index}>
              <SinglePost
                title={post.title}
                description={post.description}
                date={post.date}
                tags={post.tags}
                slug={post.slug}
                isPaginationPage={true}
              />
            </div>
          ))}
        </section>
        <Pagination numberOfPage={totalPageSize} tag="" />
      </main>
    </div>
  );
};

export default BlogTagPageList;
