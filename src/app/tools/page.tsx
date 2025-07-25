import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "作業用ツール集",
  description: "文字数カウンターなど、日常作業に役立つツール集です。",
  keywords: ["ツール", "ユーティリティ", "文字数カウント", "Web開発"],
};

interface ToolCardProps {
  href: string;
  title: string;
  description: string;
}

const ToolCard = ({ href, title, description }: ToolCardProps) => (
  <Link
    href={href}
    className="block p-6 border border-border-primary rounded-lg hover:shadow-md hover:border-border-secondary transition duration-300"
  >
    <h2 className="text-xl font-semibold mb-3">{title}</h2>
    <p className="text-muted-foreground mb-4">{description}</p>
    <span className="text-sm font-medium text-muted-foreground">
      使ってみる →
    </span>
  </Link>
);

const tools = [
  {
    href: "/tools/char-counter",
    title: "文字数カウンター",
    description: "テキストの文字数、単語数、行数を瞬時にカウントします。",
  },
  {
    href: "/tools/color-picker",
    title: "カラーピッカー",
    description:
      "HEX、RGB、HSLなど様々な形式のカラーコードを選択・変換できるツールです。",
  },
  {
    href: "/tools/regex-tester",
    title: "正規表現テスター",
    description:
      "正規表現をリアルタイムでテスト、マッチや置換結果を確認できます。",
  },
  {
    href: "/tools/text-diff",
    title: "テキスト差分比較",
    description:
      "2つのテキストの違いを視覚的に比較、追加/削除/変更を確認できます。",
  },
  {
    href: "/tools/json-formatter",
    title: "JSONフォーマッター",
    description:
      "JSONデータの整形、検証、パス抽出、ツリー表示ができるツールです。",
  },
  {
    href: "/tools/object-formatter",
    title: "オブジェクト文字列フォーマッター",
    description:
      "Dart/Java/Kotlinなどのオブジェクト文字列を見やすく整形して表示します",
  },
  {
    href: "/tools/qr-generator",
    title: "QRコードジェネレーター",
    description:
      "テキスト、URL、連絡先情報などからQRコードを簡単に生成できます。",
  },
  {
    href: "/tools/responsive-tester",
    title: "レスポンシブデザインテスター",
    description:
      "異なるデバイスサイズでWebサイトの表示を同時に確認できるツールです。",
  },
  {
    href: "/tools/csv-to-json",
    title: "CSV to JSON コンバーター",
    description:
      "CSVデータを簡単にJSONに変換できます。ファイルアップロードやオプション設定にも対応。",
  },
  {
    href: "/tools/markdown-to-pdf",
    title: "マークダウンからPDF変換",
    description:
      "マークダウンテキストをPDFドキュメントに簡単に変換できるツールです。",
  },
  {
    href: "/tools/unix-converter",
    title: "UNIXタイムスタンプ変換ツール",
    description:
      "UNIXタイムスタンプと人間が読める日時を相互変換。複数フォーマット、タイムゾーン対応。",
  },
  {
    href: "/tools/video-to-gif",
    title: "動画→GIF変換ツール",
    description:
      "動画ファイル（MP4、MOV、WebM）を高品質なGIFアニメーションに変換。ブログやプレゼンテーション用に最適化。",
  },
];

const ToolsPage = () => {
  return (
    <main className="container mx-auto w-full mt-14 px-4 md:px-8 lg:px-16">
      <div className="mx-auto lg:w-9/12">
        <header className="text-center my-8">
          <h1 className="text-4xl font-bold mb-4">作業用ツール集</h1>
          <p className="text-lg text-muted-foreground">
            日常の作業をサポートする便利なツール集です
          </p>
        </header>

        <section className="mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tools.map((tool, index) => (
              <ToolCard
                key={index}
                href={tool.href}
                title={tool.title}
                description={tool.description}
              />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
};

export default ToolsPage;
