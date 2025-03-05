import { Metadata } from "next";
import CharCounterClient from "./CharCounterClient";

export const metadata: Metadata = {
  title: "文字数カウンター | MaKe TECH Tools",
  description:
    "テキストの文字数、単語数、行数を簡単にカウントできるツールです。",
  keywords: ["文字数カウント", "テキスト解析", "文章量", "単語数"],
};

export default function CharCounterPage() {
  return <CharCounterClient />;
}
