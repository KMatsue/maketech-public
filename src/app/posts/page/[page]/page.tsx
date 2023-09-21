import Head from "next/head";
import { getNumberOfPages, getPostsByPage } from "@/lib/notionAPI";
import SinglePost from "@/components/Post/SinglePost";
import Pagination from "@/components/Pagination/Pagination";

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
  const totalPageSize = await getNumberOfPages();
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
