import Link from "next/link";
import { getAllPosts, getSinglePost } from "@/lib/notionAPI";
import RenderBlock from "@/components/notion/RenderBlock";
import TableOfContents from "@/components/TableOfContents/TableOfContents";

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
  console.log(`${JSON.stringify(blocks)}`);

  return (
    <section className="container lg:px-2 px-5 lg:w-10/12 mx-auto mt-20">
      <h1 className="w-full text-2xl font-medium">{post.metadata.title}</h1>
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
      <div className=" md:flex">
        <div className="md:w-8/12  lg:w-9/12 mt-10 mx-4">
          <div className="post font-medium">
            {/* <MarkdownField post={post} /> */}
            {blocks.map((block: any) => (
              <div key={block.id}>{RenderBlock(block)}</div>
            ))}
          </div>

          <div className="mt-10 font-medium">
            <Link href="/">
              <span className="pb-20 block mt-3 text-sky-900">
                ←ホームに戻る
              </span>
            </Link>
          </div>
        </div>
        <div className="hidden md:block md:w-4/12 lg:w-3/12 mt-10 max-h-[560px] overflow-y-scroll sticky top-[28px]">
          <TableOfContents />
        </div>
      </div>
    </section>
  );
};

export default Post;
