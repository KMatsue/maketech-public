"use client";

import React, { useState } from "react";
import Papa from "papaparse";

// Papaparseエラーの型定義
interface ParseError {
  type: string;
  code: string;
  message: string;
  row?: number;
}

// Papaparseの結果の型定義
interface ParseResult<T> {
  data: T[];
  errors: ParseError[];
  meta: {
    delimiter: string;
    linebreak: string;
    aborted: boolean;
    truncated: boolean;
    cursor: number;
    fields?: string[];
  };
}

const CsvToJsonConverterClient = () => {
  const [csvData, setCsvData] = useState<string>("");
  const [jsonResult, setJsonResult] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [options, setOptions] = useState({
    header: true,
    skipEmptyLines: true,
    dynamicTyping: false,
    trimHeaders: true,
  });
  const [showCopySuccess, setShowCopySuccess] = useState(false);

  const handleConvert = () => {
    setLoading(true);
    setError("");
    setJsonResult("");

    try {
      if (!csvData.trim()) {
        throw new Error("CSVデータを入力してください。");
      }

      Papa.parse<Record<string, any>>(csvData, {
        ...options,
        complete: (results: ParseResult<Record<string, any>>) => {
          // エラーチェック
          if (results.errors && results.errors.length > 0) {
            const parseError = results.errors[0];
            setError(
              `パースエラー: ${parseError.message}${
                parseError.row !== undefined
                  ? ` (行: ${parseError.row + 1})`
                  : ""
              }`
            );
            setLoading(false);
            return;
          }

          // 結果を整形して表示
          const formattedJson = JSON.stringify(results.data, null, 4);
          setJsonResult(formattedJson);
          setLoading(false);
        },
        error: (error: Error) => {
          setError(`エラー: ${error.message}`);
          setLoading(false);
        },
      });
    } catch (err: any) {
      setError(`エラー: ${err.message}`);
      setLoading(false);
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLTextAreaElement>) => {
    // クリップボードからのペーストをサポート
    const pastedText = e.clipboardData.getData("text");
    if (pastedText) {
      setCsvData(pastedText);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError("");
    const file = e.target.files?.[0];

    if (!file) return;

    // ファイルサイズチェック (10MB以下)
    if (file.size > 10 * 1024 * 1024) {
      setError("ファイルサイズが大きすぎます（上限: 10MB）");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result;
      if (typeof result === "string") {
        setCsvData(result);
      }
    };
    reader.onerror = () => {
      setError("ファイルの読み込みに失敗しました。");
    };
    reader.readAsText(file);
  };

  const copyToClipboard = () => {
    if (!jsonResult) return;

    navigator.clipboard
      .writeText(jsonResult)
      .then(() => {
        setShowCopySuccess(true);
        setTimeout(() => {
          setShowCopySuccess(false);
        }, 2000);
      })
      .catch((err) => {
        setError("クリップボードへのコピーに失敗しました。");
      });
  };

  const setSampleData = () => {
    // 日本人の名前を含むサンプルデータに変更
    setCsvData(`name,email,age,active,registered_date
Tanaka Yamato,tanaka@example.com,35,true,2022-01-15
Suzuki Akiko,suzuki@example.com,28,true,2022-02-20
John Smith,john@example.com,42,false,2021-11-05
Nakamura Ryu,nakamura@example.com,31,true,2022-03-10
Sato Yuki,sato@example.com,39,false,2021-09-22
Emily Johnson,emily@example.com,26,true,2022-04-18`);
  };

  return (
    <main className="container mx-auto w-full mt-14 px-4 md:px-8 lg:px-16">
      <div className="mx-auto lg:w-9/12">
        <header className="text-center my-8">
          <h1 className="text-4xl font-bold mb-4">CSV to JSON コンバーター</h1>
          <p className="text-lg text-muted-foreground">
            CSVデータをJSONに簡単に変換できます
          </p>
        </header>

        {/* オプションパネル */}
        <div className="bg-card rounded-lg shadow p-4 mb-6">
          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex items-center">
              <label className="inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="form-checkbox rounded"
                  checked={options.header}
                  onChange={() =>
                    setOptions({ ...options, header: !options.header })
                  }
                />
                <span className="ml-2 text-foreground">1行目をヘッダーとして使用</span>
              </label>
            </div>
            <div className="flex items-center">
              <label className="inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="form-checkbox rounded"
                  checked={options.skipEmptyLines}
                  onChange={() =>
                    setOptions({
                      ...options,
                      skipEmptyLines: !options.skipEmptyLines,
                    })
                  }
                />
                <span className="ml-2 text-foreground">空行をスキップ</span>
              </label>
            </div>
            <div className="flex items-center">
              <label className="inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="form-checkbox rounded"
                  checked={options.dynamicTyping}
                  onChange={() =>
                    setOptions({
                      ...options,
                      dynamicTyping: !options.dynamicTyping,
                    })
                  }
                />
                <span className="ml-2 text-foreground">型を自動検出</span>
              </label>
            </div>
          </div>
        </div>

        {/* 入力セクション */}
        <div className="bg-card rounded-lg shadow p-6 mb-6">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-xl font-semibold text-foreground">CSVデータを入力</h2>
            <button
              onClick={setSampleData}
              className="text-sm bg-muted text-foreground px-3 py-1 rounded hover:bg-muted-foreground hover:text-background"
            >
              サンプルを設定
            </button>
          </div>
          <div className="mb-4">
            <textarea
              className="w-full h-64 p-4 border border-border-primary rounded-lg focus:ring-2 focus:ring-primary focus:border-primary bg-input text-foreground font-mono"
              placeholder="ここにCSVデータを入力または貼り付け..."
              value={csvData}
              onChange={(e) => setCsvData(e.target.value)}
              onPaste={handlePaste}
            ></textarea>
          </div>
          <div className="mb-4">
            <p className="text-sm text-muted-foreground mb-2">
              または、CSVファイルをアップロード：
            </p>
            <input
              type="file"
              accept=".csv,.txt"
              onChange={handleFileUpload}
              className="block w-full text-sm text-muted-foreground
                file:mr-4 file:py-2 file:px-4
                file:rounded file:border-0
                file:text-sm file:font-semibold
                file:bg-file-button-bg file:text-file-button-text
                file:cursor-pointer cursor-pointer"
            />
          </div>
          <button
            onClick={handleConvert}
            className="w-full py-2 px-4 bg-primary text-primary-foreground rounded hover:bg-primary/80 transition-colors"
            disabled={loading}
          >
            {loading ? "コンバート中..." : "JSONに変換"}
          </button>
        </div>

        {/* 出力セクション */}
        <div className="bg-card rounded-lg shadow p-6 mb-6">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-xl font-semibold text-foreground">JSON結果</h2>
            {jsonResult && (
              <div className="relative">
                <button
                  onClick={copyToClipboard}
                  className="text-sm bg-primary/10 text-primary px-3 py-1 rounded hover:bg-primary/20"
                >
                  コピー
                </button>
                {showCopySuccess && (
                  <span className="absolute left-full ml-2 whitespace-nowrap text-sm text-primary">
                    コピーしました！
                  </span>
                )}
              </div>
            )}
          </div>
          <div className="relative">
            <pre className="w-full h-80 p-4 bg-code-bg rounded-lg overflow-auto font-mono text-sm text-foreground">
              {jsonResult || "変換結果がここに表示されます..."}
            </pre>
            {error && (
              <div className="mt-4 p-4 bg-destructive/10 text-destructive rounded-lg">
                {error}
              </div>
            )}
          </div>
        </div>

        <div className="mt-8 p-6 bg-info-bg rounded-lg">
          <h3 className="font-semibold mb-3 text-lg text-foreground">
            CSV to JSON コンバーターについて
          </h3>
          <p className="mb-4 text-info-text">
            このツールは、CSV（カンマ区切り値）データをJSON（JavaScript Object
            Notation）形式に変換します。
            変換はブラウザ上で行われるため、データがサーバーに送信されることはありません。
          </p>

          <h4 className="font-medium mt-4 mb-2 text-foreground">オプションの説明：</h4>
          <ul className="list-disc pl-5 space-y-1 text-info-text">
            <li>
              <strong>1行目をヘッダーとして使用</strong>
              ：CSVの1行目をJSONオブジェクトのキーとして使用します
            </li>
            <li>
              <strong>空行をスキップ</strong>：空の行を結果から除外します
            </li>
            <li>
              <strong>型を自動検出</strong>
              ：数値やブール値などのデータ型を自動的に検出します（オフの場合はすべて文字列として扱います）
            </li>
          </ul>

          <h4 className="font-medium mt-4 mb-2 text-foreground">使い方：</h4>
          <ol className="list-decimal pl-5 space-y-1 text-info-text">
            <li>
              CSVデータをテキストエリアに入力するか、CSVファイルをアップロードします
            </li>
            <li>必要に応じてオプションを設定します</li>
            <li>「JSONに変換」ボタンをクリックして変換します</li>
            <li>結果のJSONをコピーして使用します</li>
          </ol>

          <h4 className="font-medium mt-4 mb-2 text-foreground">
            対応している主なCSVフォーマット：
          </h4>
          <ul className="list-disc pl-5 space-y-1 text-info-text">
            <li>カンマ区切りの標準的なCSV</li>
            <li>ダブルクォーテーションで囲まれたテキスト</li>
            <li>マルチラインテキスト（クォーテーション内の改行）</li>
            <li>空フィールドや特殊文字を含むデータ</li>
          </ul>
        </div>
      </div>
    </main>
  );
};

export default CsvToJsonConverterClient;
