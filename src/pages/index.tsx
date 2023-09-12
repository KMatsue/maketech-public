import Head from "next/head";
import { getAllPosts, getAllTags, getPostsForTopPage } from "../lib/notionAPI";
import SinglePost from "../components/Post/SinglePost";
import { GetStaticProps } from "next";
import Link from "next/link";
import Tag from "@/components/Tag/Tag";

export const getStaticProps: GetStaticProps = async () => {
  const fourPosts = await getPostsForTopPage(4);
  const allTags = await getAllTags();
  return {
    props: { fourPosts, allTags },
    revalidate: 60,
  };
};

export default function Home({ fourPosts, allTags }) {
  // console.log(allPosts);

  return (
    <div className="container h-full w-full mx-auto">
      <Head>
        <title>Next.js-Notion-Blog</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container mx-auto w-full mt-16 lg:flex lg:w-8/12">
        <div className=" flex-1 lg:flex-auto lg:w-9/12">
          {" "}
          {fourPosts.map((post, index: number) => (
            <div key={index} className="mx-4">
              <SinglePost
                title={post.title}
                description={post.description}
                date={post.date}
                tags={post.tags}
                slug={post.slug}
                isPaginationPage={false}
              />
            </div>
          ))}
          <h4>
            <Link
              href="/posts/page/1"
              className="mb-6  mx-auto px-5 block text-right"
            >
              ....もっと見る
            </Link>
          </h4>
        </div>
        <div className="flex-1 lg:flex-auto lg:w-4/12">
          <Tag tags={allTags} />
        </div>
      </main>
    </div>
  );
}
