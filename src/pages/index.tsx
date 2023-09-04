import Head from "next/head";
import { getAllPosts } from "../../lib/notionAPI";

export const getStaticProps = async () => {
  const allPosts = await getAllPosts();
  return {
    props: { allPosts },
    revalidate: 60,
  };
};

export default function Home({ allPosts }) {
  console.log(allPosts);
  return (
    <div>
      <Head>
        <title>Create Next.js</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
    </div>
  );
}
