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

      <div className="container mx-auto w-full mt-14 ">
        <div className=" md:flex">
          <div className="flex-1 md:flex-auto md:w-8/12 md:mr-4 lg:w-9/12">
            <h2 className="border-b-2 border-gray-500 mb-4 ">All Posts</h2>

            <section className="md:grid grid-cols-2 gap-3 mx-auto ">
              <Posts posts={postsByPage} />
            </section>
          </div>
          <div className="flex-1 md:flex-auto md:w-4/12 lg:w-3/12">
            <h2 className="border-b-2 border-gray-500 mb-4 ">Tags</h2>
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
