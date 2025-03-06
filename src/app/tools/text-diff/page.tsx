import { Metadata } from "next";
import TextDiffClient from "./TextDiffClient";

export const metadata: Metadata = {
  title: "テキスト差分比較 | MaKe TECH Tools",
  description:
    "2つのテキストの違いを視覚的に比較・確認できるツールです。追加・削除・変更された行を色分けして表示します。",
  keywords: ["テキスト比較", "diff", "差分", "テキスト", "比較ツール"],
};

export default function TextDiffPage() {
  return <TextDiffClient />;
}
