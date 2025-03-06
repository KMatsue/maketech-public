import { Metadata } from "next";
import JsonFormatterClient from "./JsonFormatterClient";

export const metadata: Metadata = {
  title: "JSONフォーマッター/バリデーター | MaKe TECH Tools",
  description:
    "JSONデータを整形、検証、編集できるツールです。構文エラーの検出やJSON操作も可能です。",
  keywords: ["JSON", "フォーマッター", "バリデーター", "整形", "検証", "API"],
};

export default function JsonFormatterPage() {
  return <JsonFormatterClient />;
}
