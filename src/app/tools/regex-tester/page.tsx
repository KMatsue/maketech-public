import { Metadata } from "next";
import RegexTesterClient from "./RegexTesterClient";

export const metadata: Metadata = {
  title: "正規表現テスター | MaKe TECH Tools",
  description:
    "正規表現パターンをテストして、マッチング結果や置換結果をリアルタイムで確認できるツールです。",
  keywords: ["正規表現", "regex", "テスター", "マッチング", "置換"],
};

export default function RegexTesterPage() {
  return <RegexTesterClient />;
}
