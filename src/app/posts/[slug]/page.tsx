import Link from "next/link";
import { getAllPosts, getSinglePost } from "@/lib/notionAPI";
import renderBlock from "@/components/notion/renderBlock";

export const generateStaticParams = async () => {
  const allPosts = await getAllPosts();
  const paths = allPosts.map(({ slug }) => {
    slug;
  });
  console.log(`paths:${paths}`);
  return paths;
};

const Post = async ({ params }: { params: { slug: string } }) => {
  const post = await getSinglePost(params.slug);
  const blocks = post.markdown;
  console.log(blocks);

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
        {/* <MarkdownField post={post} /> */}
        {blocks.map((block: any) => (
          <div key={block.id}>{renderBlock(block)}</div>
        ))}
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
