import { Metadata } from "next";
import QrGeneratorClient from "./QrGeneratorClient";

export const metadata: Metadata = {
  title: "QRコードジェネレーター | MaKe TECH Tools",
  description:
    "テキスト、URL、連絡先情報などからQRコードを簡単に生成できるツールです。",
  keywords: ["QRコード", "QRコード生成", "URL", "連絡先", "生成ツール"],
};

export default function QrGeneratorPage() {
  return <QrGeneratorClient />;
}
