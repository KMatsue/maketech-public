import { Metadata } from "next";
import ResponsiveTesterClient from "./ResponsiveTesterClient";

export const metadata: Metadata = {
  title: "レスポンシブデザインテスター | MaKe TECH Tools",
  description:
    "異なるデバイスサイズでWebサイトの表示を同時に確認できるツールです。",
  keywords: [
    "レスポンシブデザイン",
    "ウェブ開発",
    "デバイステスト",
    "画面サイズ",
  ],
};

export default function ResponsiveTesterPage() {
  return <ResponsiveTesterClient />;
}
