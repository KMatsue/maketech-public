import dynamic from "next/dynamic";

// クライアント側でのみロードするよう設定
const MarkdownToPdfClient = dynamic(() => import("./MarkdownToPdfClient"), {
  ssr: false,
});

export const metadata = {
  title: "マークダウンからPDF変換 | MaKe TECH Tools",
  description:
    "マークダウンテキストをPDFドキュメントに簡単に変換できるツールです。",
  keywords: ["マークダウン", "PDF変換", "文書変換", "マークダウンエディタ"],
};

export default function MarkdownToPdfPage() {
  return <MarkdownToPdfClient />;
}
