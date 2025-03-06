"use client";

import React, { useState, useEffect } from "react";

type JsonNodeType =
  | "object"
  | "array"
  | "string"
  | "number"
  | "boolean"
  | "null";

interface TreeViewProps {
  data: any;
  path?: string;
  isLast?: boolean;
  level?: number;
  onPathClick: (path: string) => void;
}

const JsonFormatterClient = () => {
  const [inputJson, setInputJson] = useState<string>("");
  const [formattedJson, setFormattedJson] = useState<string>("");
  const [parsedData, setParsedData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [indentSize, setIndentSize] = useState<number>(2);
  const [copySuccess, setCopySuccess] = useState<boolean>(false);
  const [viewMode, setViewMode] = useState<"formatted" | "raw" | "tree">(
    "formatted"
  );
  const [isMinified, setIsMinified] = useState<boolean>(false);
  const [jsonPath, setJsonPath] = useState<string>("");
  const [pathResult, setPathResult] = useState<any>(null);
  const [jsonStats, setJsonStats] = useState<{
    size: string;
    nodes: number;
    depth: number;
    keys: number;
  }>({ size: "0 B", nodes: 0, depth: 0, keys: 0 });

  // JSONデータの検証と整形
  const formatJson = () => {
    try {
      if (!inputJson.trim()) {
        setFormattedJson("");
        setParsedData(null);
        setError(null);
        setJsonStats({ size: "0 B", nodes: 0, depth: 0, keys: 0 });
        return;
      }

      // JSONパース
      const parsed = JSON.parse(inputJson);
      setParsedData(parsed);

      // 整形されたJSONを設定
      const formatted = JSON.stringify(
        parsed,
        null,
        isMinified ? 0 : indentSize
      );
      setFormattedJson(formatted);

      // 統計情報を計算
      calculateJsonStats(parsed);

      setError(null);
    } catch (e) {
      setError(
        `JSONパースエラー: ${e instanceof Error ? e.message : "未知のエラー"}`
      );
      setFormattedJson("");
      setParsedData(null);
    }
  };

  // JSONデータの統計情報を計算
  const calculateJsonStats = (data: any) => {
    const size = new Blob([JSON.stringify(data)]).size;
    let sizeStr = `${size} B`;
    if (size > 1024) {
      sizeStr = `${(size / 1024).toFixed(2)} KB`;
    }
    if (size > 1024 * 1024) {
      sizeStr = `${(size / (1024 * 1024)).toFixed(2)} MB`;
    }

    // ノード数、深さ、キー数を計算
    let nodes = 0;
    let maxDepth = 0;
    let keyCount = 0;

    const traverse = (obj: any, depth: number) => {
      nodes++;
      maxDepth = Math.max(maxDepth, depth);

      if (obj && typeof obj === "object") {
        const keys = Object.keys(obj);
        keyCount += keys.length;
        keys.forEach((key) => {
          traverse(obj[key], depth + 1);
        });
      }
    };

    traverse(data, 0);

    setJsonStats({
      size: sizeStr,
      nodes,
      depth: maxDepth,
      keys: keyCount,
    });
  };

  // JSONパスを評価
  const evaluateJsonPath = () => {
    if (!parsedData || !jsonPath.trim()) {
      setPathResult(null);
      return;
    }

    try {
      // 非常に単純なパスパーサー（すべてのケースを網羅するものではありません）
      const segments = jsonPath.split(".");
      let current = parsedData;

      for (const segment of segments) {
        if (segment === "$") continue; // ルート要素

        // 配列アクセス [index] 形式をサポート
        const arrayMatch = segment.match(/^(.+)\[(\d+)\]$/);
        if (arrayMatch) {
          const [, key, index] = arrayMatch;
          current = current[key][parseInt(index, 10)];
        } else {
          current = current[segment];
        }

        if (current === undefined) {
          throw new Error(
            `パス '${jsonPath}' の解決中にプロパティ '${segment}' が見つかりませんでした`
          );
        }
      }

      setPathResult(current);
      setError(null);
    } catch (e) {
      setPathResult(null);
      setError(
        `JSONパス評価エラー: ${e instanceof Error ? e.message : "未知のエラー"}`
      );
    }
  };

  // インデントサイズ変更時の処理
  useEffect(() => {
    if (parsedData) {
      setFormattedJson(
        JSON.stringify(parsedData, null, isMinified ? 0 : indentSize)
      );
    }
  }, [indentSize, isMinified, parsedData]);

  // サンプルJSONをセット
  const setSampleJson = () => {
    const sample = {
      name: "Product Sample",
      version: "1.0.0",
      description: "Sample product data for demonstration",
      price: 1250,
      currency: "JPY",
      available: true,
      stock: 42,
      category: ["electronics", "gadgets"],
      specifications: {
        dimensions: {
          width: 10.5,
          height: 15.2,
          depth: 3.0,
          unit: "cm",
        },
        weight: {
          value: 250,
          unit: "g",
        },
        colors: ["black", "silver", "gold"],
      },
      features: [
        {
          name: "Waterproof",
          description: "Can be used in wet conditions",
        },
        {
          name: "Long Battery Life",
          description: "Up to 12 hours of continuous use",
        },
      ],
      reviews: null,
      lastUpdated: "2023-12-15T08:30:45Z",
    };

    setInputJson(JSON.stringify(sample, null, 2));
  };

  // クリップボードにコピー
  const copyToClipboard = () => {
    navigator.clipboard.writeText(formattedJson).then(() => {
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    });
  };

  // クリア
  const clearAll = () => {
    setInputJson("");
    setFormattedJson("");
    setParsedData(null);
    setError(null);
    setJsonPath("");
    setPathResult(null);
    setJsonStats({ size: "0 B", nodes: 0, depth: 0, keys: 0 });
  };

  // 整形/圧縮ボタンのクリック処理
  const toggleMinify = () => {
    setIsMinified(!isMinified);
  };

  // JSONパスのクリック処理
  const handlePathClick = (path: string) => {
    setJsonPath(path);
    // 自動的にパスを評価する
    const segments = path.split(".");
    let current = parsedData;

    try {
      for (const segment of segments) {
        if (segment === "$") continue; // ルート要素

        // 配列アクセス [index] 形式をサポート
        const arrayMatch = segment.match(/^(.+)\[(\d+)\]$/);
        if (arrayMatch) {
          const [, key, index] = arrayMatch;
          current = current[key][parseInt(index, 10)];
        } else {
          current = current[segment];
        }
      }
      setPathResult(current);
    } catch (e) {
      // エラーはUI上で表示しない（パスクリックのため）
      setPathResult(null);
    }
  };

  // JSON Treeビューコンポーネント
  const JsonTreeView: React.FC<TreeViewProps> = ({
    data,
    path = "$",
    isLast = true,
    level = 0,
    onPathClick,
  }) => {
    const [isCollapsed, setIsCollapsed] = useState(level > 2);

    const getType = (value: any): JsonNodeType => {
      if (value === null) return "null";
      if (Array.isArray(value)) return "array";
      return typeof value as JsonNodeType;
    };

    const type = getType(data);

    const getIndent = (level: number) => {
      return "  ".repeat(level);
    };

    const clickPath = (e: React.MouseEvent) => {
      e.stopPropagation();
      onPathClick(path);
    };

    const toggleCollapse = (e: React.MouseEvent) => {
      e.stopPropagation();
      setIsCollapsed(!isCollapsed);
    };

    if (type === "object" || type === "array") {
      const isEmpty = Object.keys(data).length === 0;
      const isArray = type === "array";

      return (
        <div
          className="relative pl-4"
          style={{ paddingLeft: level === 0 ? 0 : "1rem" }}
        >
          {level > 0 && (
            <div
              className="cursor-pointer inline-flex items-center"
              onClick={toggleCollapse}
            >
              <span className="mr-1 text-gray-500 dark:text-gray-400 select-none">
                {isCollapsed ? "▶" : "▼"}
              </span>
              <span
                className="font-mono text-purple-600 dark:text-purple-400 cursor-pointer hover:underline"
                onClick={clickPath}
              >
                {path === "$" ? "root" : path.split(".").pop()}
              </span>
              <span className="ml-1 text-gray-500 dark:text-gray-400 text-sm">
                {isArray ? "Array" : "Object"}
                {!isEmpty && ` (${Object.keys(data).length})`}
              </span>
              <span className="ml-1 text-gray-500 dark:text-gray-400">
                {isCollapsed
                  ? isArray
                    ? "[...]"
                    : "{...}"
                  : isArray
                  ? "["
                  : "{"}
              </span>
            </div>
          )}

          {!isCollapsed && (
            <div className="ml-4">
              {Object.entries(data).map(([key, value], i, arr) => {
                const isLastItem = i === arr.length - 1;
                const childPath =
                  path === "$" ? `${path}.${key}` : `${path}.${key}`;
                const formattedPath = isArray
                  ? childPath.replace(`.${key}`, `[${key}]`)
                  : childPath;

                return (
                  <div key={key} className="my-1">
                    {typeof value === "object" && value !== null ? (
                      <JsonTreeView
                        data={value}
                        path={formattedPath}
                        isLast={isLastItem}
                        level={level + 1}
                        onPathClick={onPathClick}
                      />
                    ) : (
                      <div className="flex">
                        <span
                          className="font-mono text-blue-600 dark:text-blue-400 cursor-pointer hover:underline"
                          onClick={() => onPathClick(formattedPath)}
                        >
                          {isArray ? `[${key}]` : key}
                        </span>
                        <span className="mx-2">:</span>
                        <JsonValue value={value} type={getType(value)} />
                        {!isLastItem && (
                          <span className="text-gray-600 dark:text-gray-400">
                            ,
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {!isCollapsed && (
            <span className="text-gray-500 dark:text-gray-400">
              {isArray ? "]" : "}"}
            </span>
          )}
        </div>
      );
    }

    return (
      <div>
        <span
          className="font-mono text-blue-600 dark:text-blue-400 cursor-pointer hover:underline"
          onClick={clickPath}
        >
          {path === "$" ? "root" : path.split(".").pop()}
        </span>
        <span className="mx-2">:</span>
        <JsonValue value={data} type={type} />
        {!isLast && <span className="text-gray-600 dark:text-gray-400">,</span>}
      </div>
    );
  };

  // JSON値を適切な色で表示するコンポーネント
  const JsonValue: React.FC<{ value: any; type: JsonNodeType }> = ({
    value,
    type,
  }) => {
    switch (type) {
      case "string":
        return (
          <span className="text-green-600 dark:text-green-400">
            &quot;{value}&quot;
          </span>
        );
      case "number":
        return (
          <span className="text-blue-600 dark:text-blue-400">{value}</span>
        );
      case "boolean":
        return (
          <span className="text-purple-600 dark:text-purple-400">
            {value.toString()}
          </span>
        );
      case "null":
        return <span className="text-gray-600 dark:text-gray-400">null</span>;
      default:
        return <span>{String(value)}</span>;
    }
  };

  return (
    <main className="container mx-auto w-full mt-14 px-4 md:px-8 lg:px-16">
      <div className="mx-auto lg:w-9/12">
        <header className="text-center my-8">
          <h1 className="text-4xl font-bold mb-4">
            JSONフォーマッター/バリデーター
          </h1>
          <p className="text-lg text-gray-700 dark:text-gray-300">
            JSONデータを整形、検証、編集できるツールです
          </p>
        </header>

        <div className="grid grid-cols-1 gap-6 mb-8">
          {/* 入力エリア */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4 border-b pb-2">
              JSONテキスト入力
            </h2>

            <div className="mb-4">
              <textarea
                value={inputJson}
                onChange={(e) => setInputJson(e.target.value)}
                className="w-full h-64 p-4 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-gray-100 font-mono text-sm"
                placeholder="ここにJSONテキストを入力またはペーストしてください..."
              ></textarea>
            </div>

            <div className="flex flex-wrap gap-4 mb-4">
              <button
                onClick={formatJson}
                className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition duration-200"
              >
                フォーマット/検証
              </button>
              <button
                onClick={setSampleJson}
                className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition duration-200"
              >
                サンプルJSONをセット
              </button>
              <button
                onClick={clearAll}
                className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition duration-200"
              >
                クリア
              </button>
            </div>
          </div>

          {/* オプションと統計 */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <div className="flex flex-wrap gap-6 justify-between">
              <div>
                <h3 className="font-medium mb-2">オプション</h3>
                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center">
                    <label htmlFor="indentSize" className="mr-2">
                      インデントサイズ:
                    </label>
                    <select
                      id="indentSize"
                      value={indentSize}
                      onChange={(e) => setIndentSize(Number(e.target.value))}
                      disabled={isMinified}
                      className="px-2 py-1 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700"
                    >
                      <option value={2}>2 スペース</option>
                      <option value={4}>4 スペース</option>
                      <option value={8}>8 スペース</option>
                    </select>
                  </div>

                  <button
                    onClick={toggleMinify}
                    className={`px-3 py-1 rounded-lg transition duration-200 ${
                      isMinified
                        ? "bg-purple-500 text-white hover:bg-purple-600"
                        : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600"
                    }`}
                  >
                    {isMinified ? "整形表示" : "圧縮表示"}
                  </button>

                  <div className="flex items-center">
                    <label htmlFor="viewMode" className="mr-2">
                      表示モード:
                    </label>
                    <select
                      id="viewMode"
                      value={viewMode}
                      onChange={(e) =>
                        setViewMode(
                          e.target.value as "formatted" | "raw" | "tree"
                        )
                      }
                      className="px-2 py-1 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700"
                    >
                      <option value="formatted">フォーマット済み</option>
                      <option value="tree">ツリービュー</option>
                      <option value="raw">RAW</option>
                    </select>
                  </div>
                </div>
              </div>

              {parsedData && (
                <div>
                  <h3 className="font-medium mb-2">JSON統計</h3>
                  <div className="grid grid-cols-2 gap-x-6 gap-y-1 text-sm">
                    <div>
                      サイズ:{" "}
                      <span className="font-semibold">{jsonStats.size}</span>
                    </div>
                    <div>
                      ノード数:{" "}
                      <span className="font-semibold">{jsonStats.nodes}</span>
                    </div>
                    <div>
                      深さ:{" "}
                      <span className="font-semibold">{jsonStats.depth}</span>
                    </div>
                    <div>
                      キー数:{" "}
                      <span className="font-semibold">{jsonStats.keys}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* JSONパス */}
          {parsedData && (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-4 border-b pb-2">
                JSONパス
              </h2>

              <div className="mb-4">
                <div className="flex mb-2">
                  <input
                    type="text"
                    value={jsonPath}
                    onChange={(e) => setJsonPath(e.target.value)}
                    className="flex-grow px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-l-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-gray-100 font-mono"
                    placeholder="例: $.category[0] または $.specifications.dimensions"
                  />
                  <button
                    onClick={evaluateJsonPath}
                    className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-r-lg transition duration-200"
                  >
                    評価
                  </button>
                </div>

                <p className="text-sm text-gray-600 dark:text-gray-400">
                  シンプルなJSONパス構文をサポート: `$.property.child` または
                  `$.array[0]`。ツリービューのノードをクリックして自動入力することもできます。
                </p>
              </div>

              {pathResult !== null && (
                <div className="mt-4">
                  <h3 className="font-medium mb-2">パス評価結果:</h3>
                  <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg overflow-auto max-h-40 font-mono">
                    {typeof pathResult === "object"
                      ? JSON.stringify(pathResult, null, 2)
                      : String(pathResult)}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* フォーマット結果 */}
          {(formattedJson || error) && (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              <div className="flex justify-between items-center mb-4 border-b pb-2">
                <h2 className="text-xl font-semibold">結果</h2>
                {formattedJson && (
                  <button
                    onClick={copyToClipboard}
                    className="px-3 py-1 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition duration-200 text-sm"
                  >
                    {copySuccess ? "コピーしました!" : "コピー"}
                  </button>
                )}
              </div>

              {error ? (
                <div className="bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 p-4 rounded-lg">
                  {error}
                </div>
              ) : (
                <div>
                  {viewMode === "formatted" && formattedJson && (
                    <pre className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg overflow-auto max-h-96 text-sm font-mono">
                      {formattedJson}
                    </pre>
                  )}

                  {viewMode === "raw" && formattedJson && (
                    <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg overflow-auto max-h-96 font-mono text-xs break-all">
                      {formattedJson}
                    </div>
                  )}

                  {viewMode === "tree" && parsedData && (
                    <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg overflow-auto max-h-96">
                      <JsonTreeView
                        data={parsedData}
                        onPathClick={handlePathClick}
                      />
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* 使い方 */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4 border-b pb-2">使い方</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
              <li>
                JSONテキストを入力欄に貼り付けるか入力し、「フォーマット/検証」ボタンをクリックします
              </li>
              <li>
                整形されたJSONが結果エリアに表示されます（構文エラーがある場合はエラーメッセージが表示されます）
              </li>
              <li>
                「表示モード」で以下の表示形式を選択できます:
                <ul className="list-disc list-inside ml-4 mt-1">
                  <li>フォーマット済み: 読みやすく整形されたJSON</li>
                  <li>
                    ツリービュー:
                    インタラクティブなツリー形式で表示（折りたたみ/展開可能）
                  </li>
                  <li>RAW: 生のJSON文字列（圧縮表示時に特に便利）</li>
                </ul>
              </li>
              <li>
                JSONパス機能を使って特定のデータ要素にアクセスできます（例:
                `$.features[0].name`）
              </li>
              <li>
                ツリービューでは、ノードをクリックしてJSONパスを自動入力できます
              </li>
              <li>「圧縮表示」ボタンで整形/圧縮を切り替えることができます</li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
};

export default JsonFormatterClient;
