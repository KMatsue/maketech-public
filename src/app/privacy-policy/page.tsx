import { Metadata } from "next";
import { getPageByIdentifier } from "@/lib/notionAPI";
import RenderBlock from "@/components/notion/RenderBlock";

import Link from "next/link";

// キャッシュと再検証の設定 - 1時間ごとに再検証
export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  const pageData = await getPageByIdentifier("privacy-policy");

  if (!pageData) {
    return {
      title: "プライバシーポリシー | MaKe TECH",
      description: "MaKe TECHのプライバシーポリシーページです。",
    };
  }

  return {
    title: `${pageData.metadata.title}`,
    description: pageData.metadata.description || "",
    keywords: pageData.metadata.keywords || "",
    openGraph: {
      title: pageData.metadata.title,
      description: pageData.metadata.description || "",
      type: "website",
    },
  };
}

export default async function PrivacyPolicy() {
  const pageData = await getPageByIdentifier("privacy-policy");

  // フォールバックコンテンツの準備（APIエラー時用）
  if (!pageData) {
    return (
      <main className="container mx-auto w-full mt-14 px-4 md:px-8 lg:px-16">
        <div className="mx-auto lg:w-9/12">
          <header className="text-center my-8">
            <h1 className="text-4xl font-bold mb-4">プライバシーポリシー</h1>
          </header>
          <p>プライバシーポリシー情報を読み込めませんでした。</p>
        </div>
      </main>
    );
  }

  const blocks = pageData.markdown;
  const { title, updatedAt } = pageData.metadata;

  // 更新日時がある場合、フォーマットした日付を生成
  const formattedDate = updatedAt
    ? new Date(updatedAt).toLocaleDateString("ja-JP", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : null;

  return (
    <main className="container mx-auto w-full mt-14 px-4 md:px-8 lg:px-16">
      <div className="mx-auto lg:w-9/12">
        <header className="text-center my-8">
          <h1 className="text-4xl font-bold mb-4">{title}</h1>
          {formattedDate && (
            <p className="text-sm text-muted-foreground">
              最終更新: {formattedDate}
            </p>
          )}
        </header>

        <div className="prose dark:prose-invert max-w-none">
          {blocks.map((block: any) => (
            <div key={block.id}>{RenderBlock(block)}</div>
          ))}
        </div>

        {/* ホームへ戻るリンク */}
        <div className="mt-12 pt-4 border-t border-border-primary">
          <Link
            href="/"
            className="text-primary hover:underline inline-block py-2"
          >
            ← ホームに戻る
          </Link>
        </div>
      </div>
    </main>
  );
}
