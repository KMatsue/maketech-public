import { Metadata } from "next";
import ColorPickerClient from "./ColorPickerClient";

export const metadata: Metadata = {
  title: "カラーピッカー | MaKe TECH Tools",
  description:
    "HEX、RGB、HSLなど様々な形式のカラーコードを選択・変換できるツールです。",
  keywords: [
    "カラーピッカー",
    "カラーコード",
    "16進数",
    "RGB",
    "HSL",
    "色変換",
  ],
};

export default function ColorPickerPage() {
  return <ColorPickerClient />;
}
