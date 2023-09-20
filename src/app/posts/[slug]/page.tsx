"use client";

import Link from "next/link";
import { getAllPosts, getSinglePost } from "@/lib/notionAPI";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/cjs/styles/prism";
import MarkdownField from "@/components/MarkdownField";

// export const getStaticPaths = async () => {
//   const allPosts = await getAllPosts();
//   const paths = allPosts.map(({ slug }) => ({ params: { slug } }));
//   return {
//     paths,
//     fallback: "blocking",
//   };
// };

// export const getStaticProps = async ({ params }) => {
//   const post = await getSinglePost(params.slug);
//   return {
//     props: { post },
//     revalidate: 60,
//   };
// };

export const generateStaticParams = async () => {
  const allPosts = await getAllPosts();
  const paths = allPosts.map(({ slug }) => {
    slug;
  });
  console.log(`paths:${paths}`);
  return paths;
};
// getStaticPropsを廃止してコンポーネント内で値を取得使用としたが、
// use clientだと非同期での値が取得できない。正しい方法がわからないので後で調べる。一旦無理やり非同期

const Post = async ({ params }) => {
  const post = await getSinglePost(params.slug);
  return (
    <section className="container lg:px-2 px-5 lg:w-3/5 mx-auto mt-20">
      <h2 className="w-full text-2xl font-medium">{post.metadata.title}</h2>
      <div className="border-b-2 w-1/3 mt-1 border-sky-900"></div>
      <span className="text-gray-500">Posted date at {post.metadata.date}</span>
      <br />
      {post.metadata.tags.map((tag: string, index: number) => (
        <p
          key={index}
          className="text-white bg-sky-900 rounded-xl font-medium mt-2 px-2 inline-block mr-2"
        >
          <Link href={`/posts/tag/${tag}/page/1`}>{tag}</Link>
        </p>
      ))}

      <div className="mt-10 font-medium">
        <ReactMarkdown
          components={{
            code({ node, inline, className, children, ...props }) {
              const match = /language-(\w+)/.exec(className || "");
              return !inline && match ? (
                <SyntaxHighlighter
                  {...props}
                  style={vscDarkPlus}
                  language={match[1]}
                  PreTag="div"
                >
                  {String(children).replace(/\n$/, "")}
                </SyntaxHighlighter>
              ) : (
                <code {...props} className={className}>
                  {children}
                </code>
              );
            },
          }}
        >
          {post.markdown}
        </ReactMarkdown>
        <MarkdownField post={post} />
      </div>

      <div className="mt-10 font-medium">
        <Link href="/">
          <span className="pb-20 block mt-3 text-sky-900">←ホームに戻る</span>
        </Link>
      </div>
    </section>
  );
};

export default Post;
