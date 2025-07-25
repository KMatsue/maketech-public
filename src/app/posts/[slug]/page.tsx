import Link from "next/link";
import { getAllPosts, getSinglePost } from "@/lib/notionAPI";
import RenderBlock from "@/components/notion/RenderBlock";
// import TableOfContents from "@/components/TableOfContents/TableOfContents";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import TagLink from "@/components/Tags/TagLink";
import ArticleFeedback from "@/components/Post/ArticleFeedback";
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
  const paths = allPosts.map(({ slug }) => ({
    slug,
  }));
  // console.log(`paths:${paths}`);
  console.log("paths:", JSON.stringify(paths, null, 2));
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

  // 記事のURL生成
  const articleUrl = `${
    process.env.SITE_URL || "http://localhost:3000"
  }/posts/${params.slug}`;

  return (
    <section className="container mx-auto mt-20 px-4 md:px-8 lg:px-16">
      <article>
        <header className="mb-8">
          <h1 className="text-3xl lg:text-4xl font-bold mb-2">
            {post.metadata.title}
          </h1>
          <div className="border-b-2 w-full md:w-1/2 my-4 border-border-primary"></div>
          <time
            className="text-muted-foreground text-sm md:text-base block mb-4"
            dateTime={post.metadata.date}
          >
            Posted on{" "}
            {new Date(post.metadata.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </time>
          <div className="flex flex-wrap gap-2 mb-6">
            {post.metadata.tags.map((tag: string) => (
              <TagLink key={tag} tag={tag} />
            ))}
          </div>
        </header>
        <div className="lg:flex mt-10 gap-8">
          <div className="lg:w-9/12">
            <div className="post font-medium">
              {blocks.map((block: any) => (
                <div key={block.id}>{RenderBlock(block)}</div>
              ))}
            </div>

            {/* フィードバックセクション */}
            <ArticleFeedback
              articleTitle={post.metadata.title}
              articleUrl={articleUrl}
            />

            <nav className="mt-12 font-medium">
              <Link
                href="/"
                className="mb-20 inline-block text-foreground hover:underline hover:text-muted-foreground"
              >
                ← ホームに戻る
              </Link>
            </nav>
          </div>
          <aside className="lg:w-3/12 mt-12 lg:mt-0">
            <div className="lg:sticky lg:top-8 border-2 border-border-primary rounded-md overflow-hidden max-h-[calc(100vh-4rem)]">
              <TableOfContents />
            </div>
          </aside>
        </div>
      </article>
    </section>
  );
};

export default Post;
