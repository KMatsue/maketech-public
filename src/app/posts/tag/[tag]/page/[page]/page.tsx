import Head from "next/head";
import {
  getAllTags,
  getNumberOfPagesByTag,
  getPostsByTagAndPage,
} from "@/lib/notionAPI";
import SinglePost from "@/components/Post/SinglePost";
import { GetStaticPaths, GetStaticProps } from "next";
import Pagination from "@/components/Pagination/Pagination";

// export const getStaticPaths: GetStaticPaths = async () => {
//   const allTags = await getAllTags();
//   let params: tagsObject[] = [];

//   type TagAndPageParam = {
//     tag: string;
//     page: string;
//   };

//   type tagsObject = {
//     params: TagAndPageParam;
//   };

//   await Promise.all(
//     allTags.map(async (tag: string) => {
//       return await getNumberOfPagesByTag(tag).then(
//         (totalPageSizeByTag: number) => {
//           for (let i = 1; i <= totalPageSizeByTag; i++) {
//             params.push({ params: { tag: tag, page: i.toString() } });
//           }
//         }
//       );
//     })
//   );

//   return {
//     paths: params,
//     fallback: "blocking",
//   };
// };

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

// export const getStaticProps: GetStaticProps = async (context) => {
//   const currentPage = context.params?.page
//     ? context.params.page.toString()
//     : "";
//   const currentTag = context.params?.tag ? context.params.tag.toString() : "";
//   const upperCaseCurrentTag =
//     currentTag.charAt(0).toUpperCase() + currentTag.slice(1);

//   const posts = await getPostsByTagAndPage(
//     upperCaseCurrentTag,
//     parseInt(currentPage)
//   );
//   const totalPageSizeByTag = await getNumberOfPagesByTag(upperCaseCurrentTag);
//   return {
//     props: { posts, totalPageSizeByTag, currentTag },
//     revalidate: 60,
//   };
// };

const BlogTagPageList = async ({ params }) => {
  // console.log(allPosts);
  const currentPage = params?.page ? params.page.toString() : "";
  const currentTag = params?.tag ? params.tag.toString() : "";
  const upperCaseCurrentTag =
    currentTag.charAt(0).toUpperCase() + currentTag.slice(1);

  const posts = await getPostsByTagAndPage(
    upperCaseCurrentTag,
    parseInt(currentPage)
  );
  const totalPageSizeByTag = await getNumberOfPagesByTag(upperCaseCurrentTag);
  return (
    <div>
      <Head>
        <title>Blog</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container w-full mt-14 lg:w-8/12 mx-auto">
        <h2 className="border-b-2 border-gray-500 mb-4 mx-4">
          {`Search tags in ${currentTag}`}
        </h2>
        <section className="md:grid grid-cols-2 gap-3">
          {posts.map((post, index: number) => (
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
        <Pagination numberOfPage={totalPageSizeByTag} tag={currentTag} />
      </main>
    </div>
  );
};

export default BlogTagPageList;
