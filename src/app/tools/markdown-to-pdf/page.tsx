import { Metadata } from "next";
import MarkdownToPdfClient from "./MarkdownToPdfClient";

export const metadata: Metadata = {
  title: "マークダウンからPDF変換 | MaKe TECH Tools",
  description:
    "マークダウンテキストをPDFドキュメントに簡単に変換できるツールです。",
  keywords: ["マークダウン", "PDF変換", "文書変換", "マークダウンエディタ"],
};

export default function MarkdownToPdfPage() {
  return <MarkdownToPdfClient />;
}
