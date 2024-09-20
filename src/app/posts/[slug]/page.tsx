import Link from "next/link";
import { getAllPosts, getSinglePost } from "@/lib/notionAPI";
import RenderBlock from "@/components/notion/RenderBlock";
// import TableOfContents from "@/components/TableOfContents/TableOfContents";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import TagLink from "@/components/Tags/TagLink";
import dynamic from "next/dynamic";

// TableOfContentsを動的インポート
const TableOfContents = dynamic(
  () => import("@/components/TableOfContents/TableOfContents"),
  {
    ssr: false,
  }
);

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
      <article>
        <h1 className="text-2xl font-medium">{post.metadata.title}</h1>
        <div className="border-b-2 w-1/3 mt-1 border-gray-500 dark:border-slate-100"></div>
        <time
          className="text-gray-500 dark:text-slate-100 text-lg mt-2 block"
          dateTime={post.metadata.date}
        >
          Posted date at {post.metadata.date}
        </time>
        <div className="mt-4 space-x-2">
          {post.metadata.tags.map((tag: string, index: number) => (
            <TagLink key={tag} tag={tag} />
          ))}
        </div>
        <div className="lg:flex mt-10 gap-8">
          <div className="lg:w-8/12">
            <div className="post font-medium">
              {blocks.map((block: any) => (
                <div key={block.id}>{RenderBlock(block)}</div>
              ))}
            </div>
            <nav className="mt-20 font-medium">
              <Link
                href="/"
                className="pb-20 block text-sky-900 dark:text-slate-100"
              >
                ← ホームに戻る
              </Link>
            </nav>
          </div>
          <aside className="lg:w-4/12 mt-12 lg:mt-0">
            <div className="lg:sticky lg:top-8 border-2 rounded-md overflow-hidden max-h-[calc(100vh-4rem)]">
              <TableOfContents />
            </div>
          </aside>
        </div>
      </article>
    </section>
  );
};

export default Post;
