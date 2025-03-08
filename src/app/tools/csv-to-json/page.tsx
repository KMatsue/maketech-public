import { Metadata } from "next";
import CsvToJsonConverterClient from "./CsvToJsonConverterClient";

export const metadata: Metadata = {
  title: "CSV to JSON コンバーター | MaKe TECH Tools",
  description:
    "CSVデータをJSONに簡単に変換できるオンラインツールです。パラメータ調整やプレビュー機能付き。",
  keywords: [
    "CSV",
    "JSON",
    "変換",
    "コンバーター",
    "データ形式変換",
    "CSV to JSON",
  ],
};

export default function CsvToJsonPage() {
  return <CsvToJsonConverterClient />;
}
