"use client";

import React, { useState, useRef, useCallback } from "react";
import { FFmpeg } from "@ffmpeg/ffmpeg";
import { toBlobURL, fetchFile } from "@ffmpeg/util";

interface ConversionOptions {
  startTime: string;
  duration: string;
  width: number;
  height: number;
  framerate: number;
  quality: number;
}

const VideoToGifClient = () => {
  // 状態管理
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [videoUrl, setVideoUrl] = useState<string>("");
  const [gifUrl, setGifUrl] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [error, setError] = useState<string>("");
  const [ffmpegLoaded, setFfmpegLoaded] = useState<boolean>(false);
  
  // 変換オプション
  const [options, setOptions] = useState<ConversionOptions>({
    startTime: "0",
    duration: "5",
    width: 480,
    height: 270,
    framerate: 10,
    quality: 80,
  });

  // FFmpeg インスタンス
  const ffmpegRef = useRef<FFmpeg | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // FFmpeg の初期化
  const loadFFmpeg = useCallback(async () => {
    if (ffmpegRef.current) return;

    try {
      setIsLoading(true);
      setProgress(10);
      
      const ffmpeg = new FFmpeg();
      ffmpegRef.current = ffmpeg;

      // プログレス監視
      ffmpeg.on("progress", ({ progress }) => {
        setProgress(20 + progress * 0.8);
      });

      // ログ監視
      ffmpeg.on("log", ({ message }) => {
        console.log("FFmpeg:", message);
      });

      setProgress(30);

      // FFmpeg のロード
      const baseURL = "https://unpkg.com/@ffmpeg/core@0.12.6/dist/umd";
      await ffmpeg.load({
        coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, "text/javascript"),
        wasmURL: await toBlobURL(`${baseURL}/ffmpeg-core.wasm`, "application/wasm"),
      });

      setFfmpegLoaded(true);
      setProgress(100);
      setTimeout(() => {
        setIsLoading(false);
        setProgress(0);
      }, 500);
    } catch (err) {
      console.error("FFmpeg loading error:", err);
      setError("FFmpegの読み込みに失敗しました。ページを再読み込みしてください。");
      setIsLoading(false);
    }
  }, []);

  // ファイル選択処理
  const handleFileSelect = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // ファイル形式チェック
    const supportedTypes = ["video/mp4", "video/mov", "video/webm", "video/quicktime"];
    if (!supportedTypes.includes(file.type)) {
      setError("サポートされていないファイル形式です。MP4、MOV、WebMファイルを選択してください。");
      return;
    }

    // ファイルサイズチェック（100MB制限）
    const maxSize = 100 * 1024 * 1024; // 100MB
    if (file.size > maxSize) {
      setError("ファイルサイズが大きすぎます。100MB以下のファイルを選択してください。");
      return;
    }

    setError("");
    setVideoFile(file);
    setVideoUrl(URL.createObjectURL(file));
    setGifUrl("");

    // 動画が読み込まれたら自動的にサイズを取得
    const video = document.createElement("video");
    video.src = URL.createObjectURL(file);
    video.onloadedmetadata = () => {
      const aspectRatio = video.videoWidth / video.videoHeight;
      const maxWidth = 600;
      const width = Math.min(maxWidth, video.videoWidth);
      const height = Math.round(width / aspectRatio);
      
      setOptions(prev => ({
        ...prev,
        width,
        height,
        duration: Math.min(10, video.duration).toString(),
      }));
    };
  }, []);

  // GIF変換処理
  const convertToGif = useCallback(async () => {
    if (!videoFile || !ffmpegRef.current) return;

    try {
      setIsLoading(true);
      setProgress(0);
      setError("");

      const ffmpeg = ffmpegRef.current;

      // 入力ファイルを書き込み
      setProgress(10);
      await ffmpeg.writeFile("input.mp4", await fetchFile(videoFile));

      setProgress(20);

      // FFmpeg コマンドを構築
      const args = [
        "-i", "input.mp4",
        "-ss", options.startTime,
        "-t", options.duration,
        "-vf", `fps=${options.framerate},scale=${options.width}:${options.height}:flags=lanczos,palettegen`,
        "palette.png"
      ];

      // パレット生成
      await ffmpeg.exec(args);
      setProgress(50);

      // GIF生成
      const gifArgs = [
        "-i", "input.mp4",
        "-i", "palette.png",
        "-ss", options.startTime,
        "-t", options.duration,
        "-filter_complex", `fps=${options.framerate},scale=${options.width}:${options.height}:flags=lanczos[v];[v][1:v]paletteuse`,
        "output.gif"
      ];

      await ffmpeg.exec(gifArgs);
      setProgress(80);

      // 出力ファイルを読み取り
      const data = await ffmpeg.readFile("output.gif");
      const blob = new Blob([data], { type: "image/gif" });
      const url = URL.createObjectURL(blob);

      setGifUrl(url);
      setProgress(100);

      // クリーンアップ
      await ffmpeg.deleteFile("input.mp4");
      await ffmpeg.deleteFile("palette.png");
      await ffmpeg.deleteFile("output.gif");

      setTimeout(() => {
        setIsLoading(false);
        setProgress(0);
      }, 500);
    } catch (err) {
      console.error("Conversion error:", err);
      setError("変換に失敗しました。設定を確認して再試行してください。");
      setIsLoading(false);
      setProgress(0);
    }
  }, [videoFile, options]);

  // ダウンロード処理
  const downloadGif = useCallback(() => {
    if (!gifUrl) return;

    const link = document.createElement("a");
    link.href = gifUrl;
    link.download = `converted_${Date.now()}.gif`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, [gifUrl]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* エラーメッセージ */}
        {error && (
          <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4">
            <p className="text-destructive text-sm">{error}</p>
          </div>
        )}

        {/* FFmpeg 初期化 */}
        {!ffmpegLoaded && (
          <div className="bg-card border border-border rounded-lg p-6 text-center">
            <h2 className="text-xl font-semibold text-foreground mb-4">
              初期化
            </h2>
            <p className="text-muted-foreground mb-4">
              動画変換エンジンを読み込み中...
            </p>
            <button
              onClick={loadFFmpeg}
              disabled={isLoading}
              className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 disabled:opacity-50"
            >
              {isLoading ? "読み込み中..." : "FFmpegを読み込む"}
            </button>
            
            {isLoading && (
              <div className="mt-4">
                <div className="w-full bg-muted rounded-full h-2">
                  <div
                    className="bg-primary h-2 rounded-full transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  {progress.toFixed(0)}%
                </p>
              </div>
            )}
          </div>
        )}

        {/* ファイル選択 */}
        {ffmpegLoaded && (
          <div className="bg-card border border-border rounded-lg p-6">
            <h2 className="text-xl font-semibold text-foreground mb-4">
              動画ファイル選択
            </h2>
            <div className="space-y-4">
              <input
                type="file"
                accept="video/mp4,video/mov,video/webm,video/quicktime"
                onChange={handleFileSelect}
                className="w-full px-3 py-2 border border-border-primary rounded-lg bg-input text-foreground focus:ring-2 focus:ring-primary focus:border-primary"
              />
              <p className="text-sm text-muted-foreground">
                対応形式: MP4, MOV, WebM（最大100MB）
              </p>
            </div>
          </div>
        )}

        {/* 動画プレビュー */}
        {videoUrl && (
          <div className="bg-card border border-border rounded-lg p-6">
            <h2 className="text-xl font-semibold text-foreground mb-4">
              動画プレビュー
            </h2>
            <video
              ref={videoRef}
              src={videoUrl}
              controls
              className="w-full max-w-2xl mx-auto rounded-lg"
              style={{ maxHeight: "400px" }}
            />
          </div>
        )}

        {/* 変換設定 */}
        {videoFile && (
          <div className="bg-card border border-border rounded-lg p-6">
            <h2 className="text-xl font-semibold text-foreground mb-4">
              変換設定
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-2">
                  開始時間（秒）
                </label>
                <input
                  type="number"
                  min="0"
                  step="0.1"
                  value={options.startTime}
                  onChange={(e) => setOptions(prev => ({ ...prev, startTime: e.target.value }))}
                  className="w-full px-3 py-2 border border-border-primary rounded-lg bg-input text-foreground focus:ring-2 focus:ring-primary focus:border-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-2">
                  長さ（秒）
                </label>
                <input
                  type="number"
                  min="0.1"
                  max="30"
                  step="0.1"
                  value={options.duration}
                  onChange={(e) => setOptions(prev => ({ ...prev, duration: e.target.value }))}
                  className="w-full px-3 py-2 border border-border-primary rounded-lg bg-input text-foreground focus:ring-2 focus:ring-primary focus:border-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-2">
                  幅（px）
                </label>
                <input
                  type="number"
                  min="100"
                  max="1920"
                  value={options.width}
                  onChange={(e) => setOptions(prev => ({ ...prev, width: parseInt(e.target.value) || 480 }))}
                  className="w-full px-3 py-2 border border-border-primary rounded-lg bg-input text-foreground focus:ring-2 focus:ring-primary focus:border-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-2">
                  高さ（px）
                </label>
                <input
                  type="number"
                  min="100"
                  max="1080"
                  value={options.height}
                  onChange={(e) => setOptions(prev => ({ ...prev, height: parseInt(e.target.value) || 270 }))}
                  className="w-full px-3 py-2 border border-border-primary rounded-lg bg-input text-foreground focus:ring-2 focus:ring-primary focus:border-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-2">
                  フレームレート（fps）
                </label>
                <select
                  value={options.framerate}
                  onChange={(e) => setOptions(prev => ({ ...prev, framerate: parseInt(e.target.value) }))}
                  className="w-full px-3 py-2 border border-border-primary rounded-lg bg-input text-foreground focus:ring-2 focus:ring-primary focus:border-primary"
                >
                  <option value={5}>5 fps (小さいサイズ)</option>
                  <option value={10}>10 fps (標準)</option>
                  <option value={15}>15 fps (滑らか)</option>
                  <option value={24}>24 fps (映画品質)</option>
                </select>
              </div>
            </div>

            <div className="mt-6">
              <button
                onClick={convertToGif}
                disabled={isLoading}
                className="w-full px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 disabled:opacity-50 font-medium"
              >
                {isLoading ? "変換中..." : "GIFに変換"}
              </button>
            </div>

            {/* 進捗バー */}
            {isLoading && (
              <div className="mt-4">
                <div className="w-full bg-muted rounded-full h-2">
                  <div
                    className="bg-primary h-2 rounded-full transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <p className="text-sm text-muted-foreground mt-2 text-center">
                  {progress.toFixed(0)}% 完了
                </p>
              </div>
            )}
          </div>
        )}

        {/* GIF結果 */}
        {gifUrl && (
          <div className="bg-card border border-border rounded-lg p-6">
            <h2 className="text-xl font-semibold text-foreground mb-4">
              変換結果
            </h2>
            <div className="text-center space-y-4">
              <img
                src={gifUrl}
                alt="Generated GIF"
                className="max-w-full mx-auto rounded-lg border border-border"
                style={{ maxHeight: "400px" }}
              />
              <button
                onClick={downloadGif}
                className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 font-medium"
              >
                GIFをダウンロード
              </button>
            </div>
          </div>
        )}

        {/* 使用方法 */}
        <div className="bg-info-bg border border-border rounded-lg p-6">
          <h2 className="text-xl font-semibold text-foreground mb-4">
            使用方法
          </h2>
          <div className="text-info-text space-y-2 text-sm">
            <p>
              • <strong>ファイル選択</strong>: MP4、MOV、WebM形式の動画ファイルを選択
            </p>
            <p>
              • <strong>設定調整</strong>: 開始時間、長さ、サイズ、フレームレートを調整
            </p>
            <p>
              • <strong>変換実行</strong>: &ldquo;GIFに変換&rdquo;ボタンをクリック
            </p>
            <p>
              • <strong>ダウンロード</strong>: 変換完了後、GIFファイルをダウンロード
            </p>
            <p className="text-amber-600 dark:text-amber-400">
              ⚠️ 処理はブラウザ内で実行されるため、大きなファイルは時間がかかる場合があります
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoToGifClient;