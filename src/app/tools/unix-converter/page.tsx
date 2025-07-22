import { Metadata } from "next";
import UnixConverterClient from "./UnixConverterClient";

export const metadata: Metadata = {
  title: "UNIXタイムスタンプ変換ツール | MaKe TECH Tools",
  description:
    "UNIXタイムスタンプとわかりやすい日時形式を相互変換できるツールです。複数フォーマット対応、タイムゾーン変換、リアルタイム表示機能付き。",
  keywords: [
    "UNIX",
    "タイムスタンプ",
    "日時変換",
    "エポック時間",
    "タイムゾーン",
    "開発ツール",
  ],
};

export default function UnixConverterPage() {
  return <UnixConverterClient />;
}
