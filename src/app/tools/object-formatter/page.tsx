import { Metadata } from "next";
import ObjectFormatterClient from "./ObjectFormatterClient";

export const metadata: Metadata = {
  title: "オブジェクト文字列フォーマッター | MaKe TECH Tools",
  description:
    "Java/Kotlinなどのオブジェクト文字列を整形して見やすく表示するツールです。",
  keywords: [
    "オブジェクト文字列",
    "フォーマッター",
    "Java",
    "Kotlin",
    "デバッグ",
    "整形",
  ],
};

export default function ObjectFormatterPage() {
  return <ObjectFormatterClient />;
}
