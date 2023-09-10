import Head from "next/head";
import { getAllPosts, getPostsForTopPage } from "../lib/notionAPI";
import SinglePost from "../components/Post/SinglePost";
import { GetStaticProps } from "next";
import Link from "next/link";
import Tag from "@/components/Tag/Tag";

export const getStaticProps: GetStaticProps = async () => {
  const fourPosts = await getPostsForTopPage(4);
  return {
    props: { fourPosts },
    revalidate: 60,
  };
};

export default function Home({ fourPosts }) {
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
            className="mb-6 lg:w-2/3 mx-auto px-5 block text-right"
          >
            ....もっと見る
          </Link>
        </h4>
        <Tag />
      </main>
    </div>
  );
}
