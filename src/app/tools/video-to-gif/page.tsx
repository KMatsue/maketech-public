import { Metadata } from "next";
import VideoToGifClient from "./VideoToGifClient";

export const metadata: Metadata = {
  title: "動画→GIF変換ツール | MaKe TECH Tools",
  description:
    "動画ファイル（MP4、MOV、WebM）を高品質なGIFアニメーションに変換。ブラウザ内処理でプライバシー保護、サイズやフレームレート調整可能。",
  keywords: [
    "動画",
    "GIF",
    "変換",
    "MP4",
    "MOV",
    "WebM",
    "アニメーション",
    "開発ツール",
    "ffmpeg",
  ],
};

export default function VideoToGifPage() {
  return (
    <div>
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-4">
          動画→GIF変換ツール
        </h1>
        <p className="text-muted-foreground">
          動画ファイルをGIFアニメーションに変換。ブログやプレゼンテーションに最適
        </p>
      </div>
      <VideoToGifClient />
    </div>
  );
}