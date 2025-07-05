import { getAllTags, getPostsTopPage } from "@/lib/notionAPI";
import Link from "next/link";
import Tag from "@/components/Tags/Tags";
import Posts from "@/components/Post/Posts";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "MaKeTECH",
  description:
    "Web開発、プログラミング、技術に関する情報を提供するテックブログです。技術的な学びや読書のアウトプット、メモを共有しています。",
  keywords: [
    "Web開発",
    "プログラミング",
    "技術ブログ",
    "ソフトウェアエンジニアリング",
    "作業用ツール",
  ],
};

const Home = async () => {
  const posts = await getPostsTopPage({ pageSize: 5 });
  const allTags = await getAllTags();

  return (
    <main className="container mx-auto w-full mt-14 px-4 md:px-8 lg:px-16">
      <div className="mx-auto lg:w-9/12">
        {/* ヘッダーセクション */}
        <header className="text-center my-8">
          <h1 className="text-4xl font-bold mb-4">MaKe TECH Blog</h1>
          <p className="text-lg text-muted-foreground">
            技術的な勉強や読書のアウトプットやメモがわりに運用するブログです。
          </p>
        </header>
        {/* 最近の投稿セクション */}
        <section className="mb-8">
          <h2 className="border-b-2 border-border-primary mb-4">Recent Posts</h2>
          <div className="space-y-6">
            <Posts posts={posts} />
          </div>
          <h4>
            <Link
              href="/posts/page/1"
              className="my-6 mx-auto px-5 block text-right"
            >
              ....もっと見る
            </Link>
          </h4>
        </section>
      </div>
      {/* タグセクション */}
      {/* <section className="mt-10">
        <div className="flex-1 md:flex-auto md:w-4/12 lg:w-3/12">
          <h2 className="border-b-2 border-border-primary mb-4 ">Tags</h2>
          <Tag tags={allTags} />
        </div>{" "}
      </section> */}
    </main>
  );
};
export default Home;
