"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { marked } from "marked";
import html2pdf from "html2pdf.js";
import { applyMarkdownStyles } from "./markdownStyles";
import MarkdownHelpModal from "./MarkdownHelpModal";

const MarkdownToPdfClient = () => {
  const [isHelpModalOpen, setIsHelpModalOpen] = useState(false);
  const [markdown, setMarkdown] = useState<string>("");
  const [fileName, setFileName] = useState<string>("document");
  const [pageSize, setPageSize] = useState<string>("A4");
  const [orientation, setOrientation] = useState<"portrait" | "landscape">(
    "portrait"
  );
  const [margins, setMargins] = useState<{
    top: number;
    right: number;
    bottom: number;
    left: number;
  }>({
    top: 10,
    right: 10,
    bottom: 10,
    left: 10,
  });
  const [fontSize, setFontSize] = useState<number>(12);
  const [previewHtml, setPreviewHtml] = useState<string>("");

  const [isFullPreviewOpen, setIsFullPreviewOpen] = useState<boolean>(false);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [generationProgress, setGenerationProgress] = useState<number>(0);

  const fullPreviewRef = useRef<HTMLDivElement>(null);

  // マークダウンの例を設定する関数
  const setExampleMarkdown = () => {
    const example = `# マークダウンからPDFへの変換サンプル

## はじめに

これはマークダウンからPDFへの変換ツールのサンプルです。

## 機能

- マークダウンの入力
- HTMLへの変換
- PDFへの出力
- スタイルのカスタマイズ

## コードサンプル

\`\`\`typescript
const convertToPdf = () => {
  const element = document.getElementById('preview');
  const opt = {
    margin: [10, 10, 10, 10],
    filename: 'document.pdf',
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
  };
  
  html2pdf().set(opt).from(element).save();
};
\`\`\`

<br><br><br>

## 表形式のデータ

| 項目 | 説明 |
|------|------|
| マークダウン | テキスト形式のマークアップ言語 |
| HTML | ウェブページを作成するための言語 |
| PDF | 電子文書のためのファイル形式 |

## 画像の挿入

画像はURLで指定することができます：

![画像の説明](https://via.placeholder.com/150)
`;
    setMarkdown(example);
  };

  // マークダウンをHTMLに変換
  useEffect(() => {
    if (markdown) {
      try {
        // marked.parseの戻り値型の問題を解決
        const html = marked.parse(markdown, { async: false }) as string;
        setPreviewHtml(html);
      } catch (error) {
        console.error("マークダウンの変換に失敗しました:", error);
      }
    } else {
      setPreviewHtml("");
    }
  }, [markdown]);

  // PDFプレビュー用のスタイル適用関数
  const applyStylesToPreview = (container: HTMLElement) => {
    applyMarkdownStyles(container, fontSize);
  };

  // フルスクリーンプレビューの表示
  const openFullPreview = () => {
    setIsFullPreviewOpen(true);

    // 次のレンダリングサイクルでDOMを操作するために遅延実行
    setTimeout(() => {
      if (fullPreviewRef.current) {
        fullPreviewRef.current.innerHTML = previewHtml;
        applyStylesToPreview(fullPreviewRef.current);
      }
    }, 100);
  };

  // PDFに変換する関数 (改良版)
  const convertToPdf = () => {
    if (!previewHtml) return;

    setIsGenerating(true);
    setGenerationProgress(0);

    // PDFコンテナを作成
    const pdfContainer = document.createElement("div") as HTMLDivElement;
    pdfContainer.innerHTML = previewHtml;

    // 適切なスタイルを適用
    applyStylesToPreview(pdfContainer);

    // document.bodyにコンテナを一時的に追加
    document.body.appendChild(pdfContainer);

    const opt = {
      margin: [margins.top, margins.right, margins.bottom, margins.left] as [
        number,
        number,
        number,
        number
      ],
      filename: `${fileName || "document"}.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: {
        scale: 2,
        useCORS: true,
        logging: false,
        letterRendering: true,
        allowTaint: true,
        imageTimeout: 5000,
      },
      jsPDF: {
        unit: "mm",
        format: pageSize.toLowerCase(),
        orientation: orientation,
        compress: true,
        putOnlyUsedFonts: true,
        precision: 16,
        userUnit: 1.0,
        metadata: {
          title: fileName || "Document",
          creator: "Markdown to PDF Converter",
          producer: "html2pdf.js",
          creationDate: new Date(),
        },
      },
      pagebreak: {
        mode: ["avoid-all", "css", "legacy"],
        before: ".page-break-before",
        after: ".page-break-after",
        avoid: ".page-break-avoid",
      },
      onProgress: (progress: number) => {
        setGenerationProgress(Math.round(progress * 100));
      },
    };

    html2pdf()
      .from(pdfContainer)
      .set(opt)
      .save()
      .then(() => {
        // クリーンアップ
        document.body.removeChild(pdfContainer);
        setIsGenerating(false);
      })
      .catch((error: any) => {
        console.error("PDF生成に失敗しました:", error);
        document.body.removeChild(pdfContainer);
        setIsGenerating(false);
      });
  };

  // ファイルアップロードハンドラ
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // ファイル名を取得（拡張子を除く）
    const fileNameWithoutExt = file.name.replace(/\.[^/.]+$/, "");
    setFileName(fileNameWithoutExt);

    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      setMarkdown(content);
    };
    reader.readAsText(file);
  };

  return (
    <main className="container mx-auto w-full mt-14 px-4 md:px-8">
      <div className="mx-auto lg:w-11/12">
        <header className="text-center my-8">
          <h1 className="text-4xl font-bold mb-4">
            マークダウンからPDFへの変換
          </h1>
          <p className="text-lg text-muted-foreground">
            マークダウンテキストを入力してPDFに変換できます
          </p>
        </header>

        {/*　タブ　*/}
        <div className="mb-8">
          <div className="border-b border-border-primary mb-4">
            <ul className="flex flex-wrap -mb-px text-sm font-medium text-center">
              <li className="mr-2">
                <button
                  className={`inline-block p-4 rounded-t-lg ${
                    !isFullPreviewOpen
                      ? "text-primary border-b-2 border-primary"
                      : "hover:text-muted-foreground hover:border-border-secondary"
                  }`}
                  onClick={() => setIsFullPreviewOpen(false)}
                >
                  マークダウン編集
                </button>
              </li>
              <li className="mr-2">
                <button
                  className={`inline-block p-4 rounded-t-lg ${
                    isFullPreviewOpen
                      ? "text-primary border-b-2 border-primary"
                      : "hover:text-muted-foreground hover:border-border-secondary"
                  }`}
                  onClick={openFullPreview}
                >
                  プレビュー
                </button>
              </li>
            </ul>
          </div>

          {isFullPreviewOpen ? (
            /* プレビュー表示 */
            <FullPreviewComponent
              pageSize={pageSize}
              orientation={orientation}
              margins={margins}
              fullPreviewRef={fullPreviewRef}
              convertToPdf={convertToPdf}
              setIsFullPreviewOpen={setIsFullPreviewOpen}
              isGenerating={isGenerating}
              generationProgress={generationProgress}
              previewHtml={previewHtml}
              fontSize={fontSize}
            />
          ) : (
            /* 入力エリアと設定エリア */
            <div className="flex flex-col space-y-6">
              {/* 入力エリア */}
              <div className="bg-card rounded-lg shadow p-6">
                <h2 className="text-xl font-semibold mb-4 border-b border-border-primary pb-2 text-foreground">
                  マークダウン入力
                </h2>

                <div className="mb-4">
                  <div className="flex justify-between mb-2 items-center">
                    <div className="flex items-center">
                      <label htmlFor="markdown" className="block font-medium text-foreground">
                        マークダウン入力
                      </label>
                      <button
                        onClick={() => setIsHelpModalOpen(true)}
                        className="ml-2 text-muted-foreground hover:text-foreground focus:outline-none"
                        aria-label="マークダウンヘルプを表示"
                        title="マークダウンヘルプを表示"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
                    </div>
                    {/* マークダウンヘルプモーダル */}
                    <MarkdownHelpModal
                      isOpen={isHelpModalOpen}
                      onClose={() => setIsHelpModalOpen(false)}
                    />
                    <button
                      onClick={setExampleMarkdown}
                      className="text-sm text-primary hover:text-primary/80"
                    >
                      サンプルを挿入
                    </button>
                  </div>
                  <textarea
                    id="markdown"
                    value={markdown}
                    onChange={(e) => setMarkdown(e.target.value)}
                    className="w-full h-96 px-4 py-2 border border-border-primary rounded-lg focus:ring-2 focus:ring-primary focus:border-primary bg-input text-foreground font-mono"
                    placeholder="# マークダウンを入力してください"
                  ></textarea>
                </div>

                <div className="mb-4">
                  <label className="block font-medium mb-2 text-foreground">
                    マークダウンファイルをアップロード
                  </label>
                  <input
                    type="file"
                    accept=".md,.markdown,.txt"
                    onChange={handleFileUpload}
                    className="block w-full text-sm text-muted-foreground file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-file-button-bg file:text-file-button-text file:cursor-pointer cursor-pointer"
                  />
                </div>
              </div>
              {/* PDF設定エリア */}

              <div className="bg-card rounded-lg shadow p-6">
                <h2 className="text-xl font-semibold mb-4 border-b border-border-primary pb-2 text-foreground">
                  PDF設定
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* 左側: 基本設定と余白設定 */}
                  <div>
                    <h3 className="font-medium mb-3 text-foreground">基本設定</h3>

                    <div className="mb-4">
                      <label
                        htmlFor="fileName"
                        className="block font-medium mb-2 text-foreground"
                      >
                        ファイル名 (拡張子なし)
                      </label>
                      <input
                        type="text"
                        id="fileName"
                        value={fileName}
                        onChange={(e) => setFileName(e.target.value)}
                        className="w-full px-4 py-2 border border-border-primary rounded-lg focus:ring-2 focus:ring-primary focus:border-primary bg-input text-foreground"
                        placeholder="document"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div>
                        <label
                          htmlFor="pageSize"
                          className="block font-medium mb-2 text-foreground"
                        >
                          ページサイズ
                        </label>
                        <select
                          id="pageSize"
                          value={pageSize}
                          onChange={(e) => setPageSize(e.target.value)}
                          className="w-full px-4 py-2 border border-border-primary rounded-lg focus:ring-2 focus:ring-primary focus:border-primary bg-input text-foreground"
                        >
                          <option value="A4">A4</option>
                          <option value="A3">A3</option>
                          <option value="A5">A5</option>
                          <option value="letter">レター</option>
                          <option value="legal">リーガル</option>
                        </select>
                      </div>

                      <div>
                        <label
                          htmlFor="orientation"
                          className="block font-medium mb-2 text-foreground"
                        >
                          向き
                        </label>
                        <select
                          id="orientation"
                          value={orientation}
                          onChange={(e) =>
                            setOrientation(
                              e.target.value as "portrait" | "landscape"
                            )
                          }
                          className="w-full px-4 py-2 border border-border-primary rounded-lg focus:ring-2 focus:ring-primary focus:border-primary bg-input text-foreground"
                        >
                          <option value="portrait">縦向き</option>
                          <option value="landscape">横向き</option>
                        </select>
                      </div>
                    </div>

                    <h3 className="font-medium mb-3 text-foreground">余白設定 (mm)</h3>
                    <div className="grid grid-cols-2 md:grid-cols-2 sm:grid-cols-1 gap-4">
                      <div>
                        <label
                          htmlFor="marginTop"
                          className="block text-sm mb-1 text-foreground"
                        >
                          上: {margins.top}mm
                        </label>
                        <input
                          type="range"
                          id="marginTop"
                          min="0"
                          max="50"
                          value={margins.top}
                          onChange={(e) =>
                            setMargins({
                              ...margins,
                              top: Number(e.target.value),
                            })
                          }
                          className="w-full h-2 bg-input rounded-lg appearance-none cursor-pointer"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="marginRight"
                          className="block text-sm mb-1 text-foreground"
                        >
                          右: {margins.right}mm
                        </label>
                        <input
                          type="range"
                          id="marginRight"
                          min="0"
                          max="50"
                          value={margins.right}
                          onChange={(e) =>
                            setMargins({
                              ...margins,
                              right: Number(e.target.value),
                            })
                          }
                          className="w-full h-2 bg-input rounded-lg appearance-none cursor-pointer"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="marginBottom"
                          className="block text-sm mb-1 text-foreground"
                        >
                          下: {margins.bottom}mm
                        </label>
                        <input
                          type="range"
                          id="marginBottom"
                          min="0"
                          max="50"
                          value={margins.bottom}
                          onChange={(e) =>
                            setMargins({
                              ...margins,
                              bottom: Number(e.target.value),
                            })
                          }
                          className="w-full h-2 bg-input rounded-lg appearance-none cursor-pointer"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="marginLeft"
                          className="block text-sm mb-1 text-foreground"
                        >
                          左: {margins.left}mm
                        </label>
                        <input
                          type="range"
                          id="marginLeft"
                          min="0"
                          max="50"
                          value={margins.left}
                          onChange={(e) =>
                            setMargins({
                              ...margins,
                              left: Number(e.target.value),
                            })
                          }
                          className="w-full h-2 bg-input rounded-lg appearance-none cursor-pointer"
                        />
                      </div>
                    </div>
                  </div>

                  {/* 右側: ページプレビュー */}
                  <div className="flex flex-col h-full">
                    <div className="relative bg-preview-area-bg rounded-lg p-4 flex-grow flex items-center justify-center">
                      {/* ページを表す長方形 - 現在の向きに基づく正確な縦横比 */}
                      <div
                        className="relative bg-card shadow-md mx-auto"
                        style={{
                          width: orientation === "portrait" ? "60%" : "75%",
                          height: orientation === "portrait" ? "85%" : "70%",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          // 最小の高さと幅を設定して潰れないようにする
                          minHeight:
                            orientation === "portrait" ? "240px" : "180px",
                          minWidth:
                            orientation === "portrait" ? "170px" : "240px",
                          maxWidth:
                            orientation === "portrait" ? "210px" : "297px",
                          maxHeight:
                            orientation === "portrait" ? "297px" : "210px",
                        }}
                      >
                        {/* 上部マージン */}
                        <div
                          className="absolute top-0 left-0 right-0 bg-pdf-margin-bg"
                          style={{
                            height: `${
                              (margins.top * 100) /
                              (orientation === "portrait" ? 297 : 210)
                            }%`,
                          }}
                        >
                          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 text-xs text-pdf-margin-text">
                            {margins.top}mm
                          </div>
                        </div>

                        {/* 右マージン */}
                        <div
                          className="absolute top-0 right-0 bottom-0 bg-pdf-margin-bg"
                          style={{
                            width: `${
                              (margins.right * 100) /
                              (orientation === "portrait" ? 210 : 297)
                            }%`,
                          }}
                        >
                          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-xs text-pdf-margin-text">
                            {margins.right}mm
                          </div>
                        </div>

                        {/* 下部マージン */}
                        <div
                          className="absolute bottom-0 left-0 right-0 bg-pdf-margin-bg"
                          style={{
                            height: `${
                              (margins.bottom * 100) /
                              (orientation === "portrait" ? 297 : 210)
                            }%`,
                          }}
                        >
                          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 text-xs text-pdf-margin-text">
                            {margins.bottom}mm
                          </div>
                        </div>

                        {/* 左マージン */}
                        <div
                          className="absolute top-0 left-0 bottom-0 bg-pdf-margin-bg"
                          style={{
                            width: `${
                              (margins.left * 100) /
                              (orientation === "portrait" ? 210 : 297)
                            }%`,
                          }}
                        >
                          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-xs text-pdf-margin-text">
                            {margins.left}mm
                          </div>
                        </div>

                        {/* コンテンツエリア */}
                        <div className="text-xs text-muted-foreground">
                          コンテンツ
                        </div>
                      </div>

                      {/* ページサイズと向きの表示 */}
                      <div className="absolute bottom-2 right-2 text-xs text-muted-foreground">
                        {pageSize}{" "}
                        {orientation === "portrait" ? "縦向き" : "横向き"}
                      </div>
                    </div>
                  </div>
                  {/* テキスト設定 */}
                  {/* <div>
                    <h3 className="font-medium mb-3">テキスト設定</h3>

                    <div>
                      <label
                        htmlFor="fontSize"
                        className="block font-medium mb-2"
                      >
                        フォントサイズ: {fontSize}px
                      </label>
                      <input
                        type="range"
                        id="fontSize"
                        min="8"
                        max="20"
                        value={fontSize}
                        onChange={(e) => setFontSize(Number(e.target.value))}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                      />
                    </div>
                  </div> */}
                </div>

                {/* PDF変換ボタン */}
                <div className="grid grid-cols-2 gap-4 mt-8">
                  <button
                    onClick={openFullPreview}
                    className="w-full px-4 py-2 text-sm sm:text-base bg-input text-foreground hover:bg-muted-foreground hover:text-background rounded-lg transition duration-200"
                    disabled={!previewHtml}
                  >
                    プレビューを表示
                  </button>
                  <button
                    onClick={convertToPdf}
                    disabled={!markdown || isGenerating}
                    className={`w-full px-4 py-2 text-sm sm:text-base bg-primary hover:bg-primary/80 text-primary-foreground rounded-lg transition duration-200 ${
                      !markdown || isGenerating
                        ? "opacity-50 cursor-not-allowed"
                        : ""
                    }`}
                  >
                    {isGenerating
                      ? `変換中... ${generationProgress}%`
                      : "PDFに変換"}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* 使い方 - 水色背景部分 */}
        <div className="mt-8 p-4 bg-usage-hints-bg rounded-lg mb-8">
          <h3 className="font-semibold mb-2 text-usage-hints-text">使い方のヒント</h3>
          <ul className="list-disc pl-5 space-y-1 text-sm text-usage-hints-text">
            <li>
              マークダウンテキストを入力するか、マークダウンファイル(.md)をアップロードします
            </li>
            <li>
              「サンプルを挿入」ボタンをクリックすると、マークダウンの例が入力されます
            </li>
            <li>
              「プレビューを表示」タブで、PDFに変換される前の状態を確認できます
            </li>
            <li>
              ファイル名、ページサイズ、向き、フォントサイズ、余白をカスタマイズできます
            </li>
            <li>
              「PDFに変換」ボタンをクリックすると、PDFファイルがダウンロードされます
            </li>
          </ul>
        </div>
        {/* 注意事項 */}
        <div className="mt-4 text-xs text-muted-foreground">
          <p className="mb-1 text-foreground">注意事項:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>
              このツールはクライアントサイドで動作し、入力データはサーバーに送信されません
            </li>
            <li>
              画像はURLで指定する必要があり、ローカルの画像は埋め込めません
            </li>
            <li>
              大きなマークダウンファイルや複雑な内容の場合、変換に時間がかかることがあります
            </li>
            <li>
              PDFのレイアウトは、プレビューと完全に一致しない場合があります
            </li>
          </ul>
        </div>
      </div>
    </main>
  );
};

export default MarkdownToPdfClient;

const FullPreviewComponent = ({
  pageSize,
  orientation,
  margins,
  fullPreviewRef,
  convertToPdf,
  setIsFullPreviewOpen,
  isGenerating,
  generationProgress,
  previewHtml,
  fontSize,
}: {
  pageSize: string;
  orientation: "portrait" | "landscape";
  margins: { top: number; right: number; bottom: number; left: number };
  fullPreviewRef: React.RefObject<HTMLDivElement>;
  convertToPdf: () => void;
  setIsFullPreviewOpen: (isOpen: boolean) => void;
  isGenerating: boolean;
  generationProgress: number;
  previewHtml: string;
  fontSize: number;
}) => {
  // ページサイズに関する情報
  const pageSizes: Record<string, { width: number; height: number }> = {
    a4: { width: 210, height: 297 },
    a3: { width: 297, height: 420 },
    a5: { width: 148, height: 210 },
    letter: { width: 216, height: 279 },
    legal: { width: 216, height: 356 },
  };

  // 現在のページサイズ情報を取得
  const currentSize = pageSizes[pageSize.toLowerCase()] || pageSizes["a4"];

  // プレビュー表示の幅と高さを計算
  const pageWidth =
    orientation === "portrait" ? currentSize.width : currentSize.height;
  const pageHeight =
    orientation === "portrait" ? currentSize.height : currentSize.width;

  // 複数ページの表示関連の状態
  const [pages, setPages] = useState<string[]>([]);
  const [isMultiPageView, setIsMultiPageView] = useState(false);
  const [isCalculating, setIsCalculating] = useState(false);

  // ビューポートに合わせたスケール計算
  const calculateScale = () => {
    const containerWidth = window.innerWidth * 0.7;
    const containerHeight = window.innerHeight * 0.6;

    const pageWidth =
      orientation === "portrait" ? currentSize.width : currentSize.height;
    const pageHeight =
      orientation === "portrait" ? currentSize.height : currentSize.width;

    const scaleByWidth = containerWidth / pageWidth;
    const scaleByHeight = containerHeight / pageHeight;

    return Math.min(0.7, Math.min(scaleByWidth, scaleByHeight));
  };

  const [scale, setScale] = useState(calculateScale());

  // スタイル適用の共通関数
  const applyStylesToContent = useCallback(
    (container: HTMLElement) => {
      applyMarkdownStyles(container, fontSize, { forPreview: true });
    },
    [fontSize]
  );

  // 文書をページに分割する関数
  const splitIntoPages = useCallback(() => {
    if (!previewHtml) {
      console.log("No preview HTML to split");
      return;
    }

    setIsCalculating(true);

    try {
      console.log("Starting page calculation...");

      // 測定用のコンテナを作成
      const contentWidthMm = pageWidth - margins.left - margins.right;
      const testElement = document.createElement("div");
      testElement.style.width = `${contentWidthMm}mm`;
      testElement.style.position = "absolute";
      testElement.style.left = "-9999px";
      document.body.appendChild(testElement);

      // ピクセル/mm比率を計算
      const pixelsPerMm = testElement.offsetWidth / contentWidthMm;
      const pageHeightPixels =
        (pageHeight - margins.top - margins.bottom) * pixelsPerMm;

      document.body.removeChild(testElement);

      // HTMLをパースしてDOM構造を取得
      const parser = new DOMParser();
      const doc = parser.parseFromString(previewHtml, "text/html");
      const topLevelNodes = Array.from(doc.body.childNodes);

      // 各要素の配置先ページを決定
      const pages: HTMLElement[] = [];
      let currentPage = document.createElement("div");
      let currentPageHeight = 0;

      // 要素が分割可能かを判断する関数
      const isUnbreakableElement = (node: Node): boolean => {
        if (node.nodeType !== Node.ELEMENT_NODE) return false;

        const element = node as HTMLElement;
        const tagName = element.tagName.toLowerCase();

        // 分割不可能な要素のリスト
        return ["table", "pre", "figure", "tr", "li"].includes(tagName);
      };

      // 要素の高さを測定する関数
      const measureElementHeight = (node: Node): number => {
        const tempDiv = document.createElement("div");
        tempDiv.style.width = `${contentWidthMm}mm`;
        tempDiv.style.position = "absolute";
        tempDiv.style.left = "-9999px";
        tempDiv.style.visibility = "hidden";

        // 要素をクローンして測定用divに追加
        tempDiv.appendChild(node.cloneNode(true));
        document.body.appendChild(tempDiv);

        // インポートしたスタイル適用関数を使用
        applyMarkdownStyles(tempDiv, fontSize, { forPreview: true });

        const height = tempDiv.offsetHeight;
        document.body.removeChild(tempDiv);

        return height;
      };

      // ノードを処理する関数
      for (const node of topLevelNodes) {
        // テキストノードで内容が空の場合はスキップ
        if (
          node.nodeType === Node.TEXT_NODE &&
          (node as Text).data.trim() === ""
        ) {
          continue;
        }

        // 要素の高さを測定
        const nodeHeight = measureElementHeight(node);

        // この要素を追加するとページをオーバーフローするかチェック
        const wouldOverflow = currentPageHeight + nodeHeight > pageHeightPixels;

        // 分割不可能な要素または現在のページがオーバーフローする場合
        if (wouldOverflow) {
          // 既存ページがあれば保存（空でない場合）
          if (currentPage.childNodes.length > 0) {
            pages.push(currentPage);
            currentPage = document.createElement("div");
            currentPageHeight = 0;
          }

          // 分割不可能な要素が単独でページに収まらない場合の特別処理
          if (isUnbreakableElement(node) && nodeHeight > pageHeightPixels) {
            console.log(
              "Oversized unbreakable element detected - forcing to fit"
            );
            // 強制的に単独のページとして処理
            const forcePage = document.createElement("div");
            forcePage.appendChild(node.cloneNode(true));
            pages.push(forcePage);
          } else {
            // 通常の次ページ処理
            currentPage.appendChild(node.cloneNode(true));
            currentPageHeight = nodeHeight;
          }
        } else {
          // 通常の要素追加
          currentPage.appendChild(node.cloneNode(true));
          currentPageHeight += nodeHeight;
        }
      }

      // 最後のページを追加（空でない場合）
      if (currentPage.childNodes.length > 0) {
        pages.push(currentPage);
      }

      // 各ページにスタイルを適用
      pages.forEach((page) => {
        applyMarkdownStyles(page, fontSize, { forPreview: true });
      });

      // HTMLとして変換
      const pageContents = pages.map((page) => page.innerHTML);

      console.log(`Generated ${pageContents.length} pages`);
      setPages(pageContents);
    } catch (error) {
      console.error("Error splitting pages:", error);
      setPages([previewHtml]);
    } finally {
      setIsCalculating(false);
    }
  }, [previewHtml, pageWidth, pageHeight, margins, fontSize]);

  // ウィンドウサイズ変更時とページサイズ/向き変更時にスケールを再計算
  useEffect(() => {
    const handleResize = () => {
      setScale(calculateScale());
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orientation, pageSize]);

  // 複数ページビューが有効になったらページ分割を実行
  useEffect(() => {
    if (isMultiPageView && previewHtml) {
      console.log("Multi-page view activated, calculating pages...");
      // 少し遅延させてDOMが確実に更新された後に実行
      const timer = setTimeout(() => {
        splitIntoPages();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [isMultiPageView, previewHtml, splitIntoPages]);

  // 表示モード切り替え時のスタイル適用を管理するuseEffect
  useEffect(() => {
    // 単一ページビューに戻ったとき
    if (!isMultiPageView && fullPreviewRef.current && previewHtml) {
      console.log("Restoring single page content with styles");
      // コンテンツをリセット
      fullPreviewRef.current.innerHTML = previewHtml;
      applyStylesToContent(fullPreviewRef.current);
    }
  }, [
    isMultiPageView,
    previewHtml,
    fontSize,
    applyStylesToContent,
    fullPreviewRef,
  ]);

  return (
    <div className="bg-card rounded-lg shadow p-4 mb-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-foreground">PDF プレビュー</h2>
        <div className="flex items-center space-x-4">
          <div className="text-sm text-muted-foreground">
            {pageSize.toUpperCase()} /{" "}
            {orientation === "portrait" ? "縦向き" : "横向き"}({pageWidth}mm ×{" "}
            {pageHeight}mm)
          </div>
          {/* ズームコントロール */}
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setScale((prev) => Math.max(prev - 0.1, 0.3))}
              className="px-2 py-1 bg-muted rounded text-sm text-foreground"
            >
              −
            </button>
            <span className="text-sm text-foreground">{Math.round(scale * 100)}%</span>
            <button
              onClick={() => setScale((prev) => Math.min(prev + 0.1, 1.5))}
              className="px-2 py-1 bg-muted rounded text-sm text-foreground"
            >
              +
            </button>
          </div>
          {/* ページビュー切り替えボタン */}
          <button
            onClick={() => setIsMultiPageView(!isMultiPageView)}
            className={`px-3 py-1 text-sm rounded ${
              isMultiPageView
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-foreground"
            }`}
          >
            {isMultiPageView ? "単一ページ表示" : "複数ページ表示"}
          </button>
        </div>
      </div>

      {/* スクロール可能なコンテナ */}
      <div className="overflow-auto bg-muted p-4 rounded-lg flex flex-col items-center">
        {isMultiPageView ? (
          // 複数ページビュー
          <div className="space-y-8">
            {isCalculating || pages.length === 0 ? (
              <div className="flex items-center justify-center p-8">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-2"></div>
                  <p className="text-muted-foreground">ページを計算中...</p>
                </div>
              </div>
            ) : (
              pages.map((pageHtml, index) => (
                <div key={index} className="relative">
                  {/* ページ番号表示 */}
                  <div className="absolute -top-4 right-0 bg-secondary text-secondary-foreground px-2 py-1 rounded text-xs">
                    ページ {index + 1} / {pages.length}
                  </div>

                  {/* 用紙 */}
                  <div
                    className="pdf-page bg-white shadow-lg relative transition-all duration-300 ease-in-out"
                    style={{
                      width: `${pageWidth}mm`,
                      height: `${pageHeight}mm`,
                      transform: `scale(${scale})`,
                      transformOrigin: "top center",
                      boxShadow: "0 0 10px rgba(0,0,0,0.15)",
                      border: "1px solid rgba(0, 0, 0, 0.2)",
                    }}
                  >
                    {/* コンテンツエリア */}
                    <div
                      className="content-area"
                      style={{
                        position: "absolute",
                        top: `${margins.top}mm`,
                        right: `${margins.right}mm`,
                        bottom: `${margins.bottom}mm`,
                        left: `${margins.left}mm`,
                        overflow: "hidden",
                        border: "1px dashed rgba(0, 0, 255, 0.3)",
                        fontFamily:
                          "'Hiragino Sans', 'Meiryo', 'Noto Sans JP', sans-serif",
                        fontSize: `${fontSize}px`,
                        lineHeight: "1.5",
                      }}
                    >
                      {/* スタイル適用されたコンテンツ */}
                      <div
                        className="styled-content"
                        dangerouslySetInnerHTML={{ __html: pageHtml }}
                        ref={(node) => {
                          if (node) {
                            // ページコンテンツにスタイルを適用
                            applyStylesToContent(node);
                          }
                        }}
                      />{" "}
                    </div>

                    {/* マージン領域の視覚的表現 */}
                    <div className="margin-indicators">
                      {/* 上部マージン */}
                      <div
                        style={{
                          position: "absolute",
                          top: 0,
                          left: 0,
                          right: 0,
                          height: `${margins.top}mm`,
                          backgroundColor: "rgba(200, 200, 200, 0.1)",
                          borderBottom: "1px dotted rgba(100, 100, 100, 0.2)",
                        }}
                      ></div>
                      {/* 右側マージン */}
                      <div
                        style={{
                          position: "absolute",
                          top: 0,
                          right: 0,
                          bottom: 0,
                          width: `${margins.right}mm`,
                          backgroundColor: "rgba(200, 200, 200, 0.1)",
                          borderLeft: "1px dotted rgba(100, 100, 100, 0.2)",
                        }}
                      ></div>
                      {/* 下部マージン */}
                      <div
                        style={{
                          position: "absolute",
                          bottom: 0,
                          left: 0,
                          right: 0,
                          height: `${margins.bottom}mm`,
                          backgroundColor: "rgba(200, 200, 200, 0.1)",
                          borderTop: "1px dotted rgba(100, 100, 100, 0.2)",
                        }}
                      ></div>
                      {/* 左側マージン */}
                      <div
                        style={{
                          position: "absolute",
                          top: 0,
                          left: 0,
                          bottom: 0,
                          width: `${margins.left}mm`,
                          backgroundColor: "rgba(200, 200, 200, 0.1)",
                          borderRight: "1px dotted rgba(100, 100, 100, 0.2)",
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        ) : (
          // 単一ページビュー（既存のプレビュー）
          <div
            className="pdf-page bg-white shadow-lg relative transition-all duration-300 ease-in-out"
            style={{
              width: `${pageWidth}mm`,
              height: `${pageHeight}mm`,
              transform: `scale(${scale})`,
              transformOrigin: "top center",
              boxShadow: "0 0 10px rgba(0,0,0,0.15)",
              border: "1px solid rgba(0, 0, 0, 0.2)",
            }}
          >
            {/* コンテンツエリア */}
            <div
              className="content-area"
              style={{
                position: "absolute",
                top: `${margins.top}mm`,
                right: `${margins.right}mm`,
                bottom: `${margins.bottom}mm`,
                left: `${margins.left}mm`,
                overflow: "auto",
                border: "1px dashed rgba(0, 0, 255, 0.3)",
              }}
            >
              {/* 実際のコンテンツ */}
              <div ref={fullPreviewRef} className="pdf-content h-full"></div>
            </div>

            {/* マージン領域の視覚的表現 */}
            <div className="margin-indicators">
              {/* 上部マージン */}
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  height: `${margins.top}mm`,
                  backgroundColor: "rgba(200, 200, 200, 0.1)",
                  borderBottom: "1px dotted rgba(100, 100, 100, 0.2)",
                }}
              ></div>
              {/* 右側マージン */}
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  right: 0,
                  bottom: 0,
                  width: `${margins.right}mm`,
                  backgroundColor: "rgba(200, 200, 200, 0.1)",
                  borderLeft: "1px dotted rgba(100, 100, 100, 0.2)",
                }}
              ></div>
              {/* 下部マージン */}
              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: `${margins.bottom}mm`,
                  backgroundColor: "rgba(200, 200, 200, 0.1)",
                  borderTop: "1px dotted rgba(100, 100, 100, 0.2)",
                }}
              ></div>
              {/* 左側マージン */}
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  bottom: 0,
                  width: `${margins.left}mm`,
                  backgroundColor: "rgba(200, 200, 200, 0.1)",
                  borderRight: "1px dotted rgba(100, 100, 100, 0.2)",
                }}
              ></div>
            </div>
          </div>
        )}
      </div>

      {/* ボタン */}
      <div className="flex justify-between mt-4">
        <button
          onClick={() => setIsFullPreviewOpen(false)}
          className="px-4 py-2 bg-muted text-foreground hover:bg-muted-foreground hover:text-background rounded-lg"
        >
          編集に戻る
        </button>
        <button
          onClick={convertToPdf}
          disabled={!previewHtml || isGenerating}
          className={`px-4 py-2 bg-primary hover:bg-primary/80 text-primary-foreground rounded-lg ${
            !previewHtml || isGenerating ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {isGenerating ? `変換中... ${generationProgress}%` : "PDFに変換"}
        </button>
      </div>
    </div>
  );
};
