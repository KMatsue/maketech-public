import Link from "next/link";
import { getAllPosts, getSinglePost } from "@/lib/notionAPI";
import RenderBlock from "@/components/notion/RenderBlock";
import TableOfContents from "@/components/TableOfContents/TableOfContents";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export const generateStaticParams = async () => {
  const allPosts = await getAllPosts();
  const paths = allPosts.map(({ slug }) => {
    slug;
  });
  console.log(`paths:${paths}`);
  return paths;
};

export const generateMetadata = async ({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> => {
  const post = await getSinglePost(params.slug);
  if (!post) return notFound();
  return {
    title: post.metadata.title,
    description:
      post.metadata.description || `${post.metadata.title}に関する記事です。`,
    keywords: [...post.metadata.tags, "Web開発", "プログラミング", "技術情報"],
    openGraph: {
      title: post.metadata.title,
      description: post.metadata.description,
      type: "article",
      publishedTime: post.metadata.date,
    },
  };
};

const Post = async ({ params }: { params: { slug: string } }) => {
  const post = await getSinglePost(params.slug);
  if (!post) return notFound();
  console.log(post.metadata);
  const blocks = post.markdown;
  // console.log(`${JSON.stringify(blocks)}`);

  return (
    <section className="container mx-auto mt-20 px-4 md:px-8 lg:px-16">
      <h1 className="text-2xl font-medium">{post.metadata.title}</h1>
      <div className="border-b-2 w-1/3 mt-1 border-gray-500 dark:border-slate-100"></div>
      <span className="text-gray-500 dark:text-slate-100 text-lg mt-2 block">
        Posted date at {post.metadata.date}
      </span>
      <div className="mt-4">
        {post.metadata.tags.map((tag: string, index: number) => (
          <span
            key={index}
            className="text-white bg-gray-500 rounded-xl font-medium mt-2 px-2 inline-block mr-2"
          >
            <Link href={`/posts/tag/${tag}/page/1`}>{tag}</Link>
          </span>
        ))}
      </div>
      <div className="md:flex mt-10">
        <div className="md:w-8/12 lg:w-9/12 md:mr-4">
          <div className="post font-medium">
            {blocks.map((block: any) => (
              <div key={block.id}>{RenderBlock(block)}</div>
            ))}
          </div>
          <div className="mt-20 font-medium">
            <Link href="/">
              <span className="pb-20 block text-sky-900 dark:text-slate-100">
                ← ホームに戻る
              </span>
            </Link>
          </div>
        </div>
        <div
          className="hidden md:block md:w-4/12 lg:w-3/12 mt-12 ml-4 h-fit max-h-[80vh]
          overflow-y-scroll sticky top-[28px] border-2 rounded-md"
        >
          <TableOfContents />
        </div>
      </div>
    </section>
  );
};

export default Post;
