import Head from "next/head";
import { getNumberOfPages, getPostsByPage } from "../../../lib/notionAPI";
import SinglePost from "../../../components/Post/SinglePost";
import { GetStaticPaths, GetStaticProps } from "next";
import Pagination from "@/components/Pagination/Pagination";

export const getStaticPaths: GetStaticPaths = async () => {
  const totalPageSize = await getNumberOfPages();
  let params = [];
  for (let i = 1; i <= totalPageSize; i++) {
    params.push({ params: { page: i.toString() } });
  }

  return {
    paths: params,
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const currentPage = context.params?.page;
  const postsByPage = await getPostsByPage(
    parseInt(currentPage.toString(), 10)
  );
  const totalPageSize = await getNumberOfPages();
  return {
    props: { postsByPage, totalPageSize },
    revalidate: 60,
  };
};

const BlogPageList = ({ postsByPage, totalPageSize }) => {
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
          {postsByPage.map((post, index: number) => (
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

export default BlogPageList;
