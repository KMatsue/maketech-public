import Head from "next/head";
import { getAllTags, getPostsForTopPage } from "@/lib/notionAPI";
import SinglePost from "../components/post/SinglePost";
import { GetStaticProps } from "next";
import Link from "next/link";
import Tag from "@/components/tags/Tags";

export const getStaticProps: GetStaticProps = async () => {
  const fourPosts = await getPostsForTopPage(4);
  const allTags = await getAllTags();
  return {
    props: { fourPosts, allTags },
    revalidate: 60,
  };
};

export default function Home({ fourPosts, allTags }) {
  return (
    <div>
      <Head>
        <title>Next.js-Notion-Blog</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container mx-auto w-full mt-14 md:flex lg:w-8/12">
        <div className="flex-1 md:flex-auto md:w-8/12 lg:w-9/12">
          <h2 className="border-b-2 border-gray-500 mb-4 mx-4">Recent Posts</h2>
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
        <div className="flex-1 md:flex-auto md:w-4/12 lg:w-3/12">
          <h2 className="border-b-2 border-gray-500 mb-4 mx-4">Tags</h2>
          <Tag tags={allTags} />
        </div>
      </main>
    </div>
  );
}
