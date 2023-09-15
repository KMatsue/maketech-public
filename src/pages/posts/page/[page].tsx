import Head from "next/head";
import { getNumberOfPages, getPostsByPage } from "../../../lib/notionAPI";
import SinglePost from "../../../components/post/SinglePost";
import { GetStaticPaths, GetStaticProps } from "next";
import Pagination from "@/components/pagination/Pagination";

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
    <div>
      <Head>
        <title>Blog</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container mx-auto w-full mt-14 lg:w-8/12">
        <h2 className="border-b-2 border-gray-500 mb-4 mx-4">All Posts</h2>

        <section className="md:grid grid-cols-2 gap-3 mx-auto ">
          {postsByPage.map((post, index: number) => (
            <div key={index} className="mx-4">
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
