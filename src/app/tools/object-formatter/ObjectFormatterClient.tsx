"use client";

import React, { useState } from "react";

const ObjectFormatterClient = () => {
  const [inputText, setInputText] = useState<string>("");
  const [formattedJson, setFormattedJson] = useState<string>("");
  const [parsedData, setParsedData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [indentSize, setIndentSize] = useState<number>(2);
  const [isMinified, setIsMinified] = useState<boolean>(false);
  const [copySuccess, setCopySuccess] = useState<boolean>(false);
  const [viewMode, setViewMode] = useState<"formatted" | "tree">("formatted");

  // オブジェクト文字列をパースする関数
  const parseObjectString = (text: string) => {
    try {
      // クラス名と中身を抽出する正規表現 (sフラグを使わない)
      const classPattern = /^(\w+)\s*{([\s\S]*)}$/;
      const match = text.match(classPattern);

      if (!match) {
        throw new Error("有効なオブジェクト文字列形式ではありません");
      }

      const className = match[1];
      const content = match[2];

      // プロパティをパースする関数
      const parseProperties = (content: string) => {
        // 結果オブジェクト
        const result: any = {};

        // プロパティ文字列をトークン化
        let remaining = content.trim();
        let currentPosition = 0;

        while (currentPosition < remaining.length) {
          // キーを抽出
          const equalsPos = remaining.indexOf("=", currentPosition);
          if (equalsPos === -1) break;

          const key = remaining.substring(currentPosition, equalsPos).trim();

          // 値の開始位置
          let valueStart = equalsPos + 1;
          let valueEnd = valueStart;
          let nestLevel = 0;
          let inString = false;

          // 値の終了位置を見つける
          while (valueEnd < remaining.length) {
            const char = remaining[valueEnd];

            if (char === '"' && remaining[valueEnd - 1] !== "\\") {
              inString = !inString;
            }

            if (!inString) {
              if (char === "{") nestLevel++;
              else if (char === "}") nestLevel--;
              else if (char === "[") nestLevel++;
              else if (char === "]") nestLevel--;
              else if (char === "," && nestLevel === 0) {
                break;
              }
            }

            valueEnd++;
          }

          // 値を抽出して処理
          let value = remaining.substring(valueStart, valueEnd).trim();

          // ネストされたオブジェクトをパース
          if (value.includes("{") && value.includes("}")) {
            // sフラグを使わない正規表現
            const nestedClassMatch = value.match(/^(\w+)\s*{([\s\S]*)}$/);
            if (nestedClassMatch) {
              const nestedClassName = nestedClassMatch[1];
              const nestedContent = nestedClassMatch[2];

              const nestedProps = parseProperties(nestedContent);
              result[key] = {
                __class: nestedClassName,
                ...nestedProps,
              };
            } else {
              result[key] = parseValue(value);
            }
          }
          // 配列をパース
          else if (value.startsWith("[") && value.endsWith("]")) {
            const arrayContent = value.substring(1, value.length - 1).trim();
            if (arrayContent) {
              result[key] = parseArray(arrayContent);
            } else {
              result[key] = [];
            }
          }
          // その他の値をパース
          else {
            result[key] = parseValue(value);
          }

          // 次のプロパティへ
          currentPosition = valueEnd + 1;
          if (remaining[valueEnd] !== ",") {
            break;
          }
        }

        return result;
      };

      // 配列をパースする関数
      const parseArray = (arrayStr: string) => {
        const items = [];
        let currentPos = 0;
        let itemStart = 0;
        let nestLevel = 0;
        let inString = false;

        while (currentPos <= arrayStr.length) {
          const char = arrayStr[currentPos];

          if (char === '"' && arrayStr[currentPos - 1] !== "\\") {
            inString = !inString;
          }

          if (!inString) {
            if (char === "{") nestLevel++;
            else if (char === "}") nestLevel--;
            else if (char === "[") nestLevel++;
            else if (char === "]") nestLevel--;
            else if (
              (char === "," && nestLevel === 0) ||
              currentPos === arrayStr.length
            ) {
              // アイテムの終わり
              const item = arrayStr.substring(itemStart, currentPos).trim();
              if (item) {
                if (item.includes("{") && item.includes("}")) {
                  // sフラグを使わない正規表現
                  const nestedClassMatch = item.match(/^(\w+)\s*{([\s\S]*)}$/);
                  if (nestedClassMatch) {
                    const nestedClassName = nestedClassMatch[1];
                    const nestedContent = nestedClassMatch[2];

                    const nestedProps = parseProperties(nestedContent);
                    items.push({
                      __class: nestedClassName,
                      ...nestedProps,
                    });
                  } else {
                    items.push(parseValue(item));
                  }
                } else {
                  items.push(parseValue(item));
                }
              }
              itemStart = currentPos + 1;
            }
          }

          currentPos++;
        }

        return items;
      };

      // 値を適切な型に変換する関数
      const parseValue = (value: string) => {
        value = value.trim();

        if (value === "null") return null;
        if (value === "true") return true;
        if (value === "false") return false;

        // 数値
        if (/^-?\d+(\.\d+)?$/.test(value)) return Number(value);

        // 日付文字列
        if (/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/.test(value)) return value;

        // enum値
        if (/^[A-Z_]+\.[A-Z_]+$/.test(value)) {
          const parts = value.split(".");
          return { __type: "ENUM", __enum: parts[0], value: parts[1] };
        }

        // 文字列（引用符なし）
        return value;
      };

      // 最終的なオブジェクトを組み立て
      const parsed = {
        __class: className,
        ...parseProperties(content),
      };

      return parsed;
    } catch (e) {
      throw new Error(
        `オブジェクト文字列のパースエラー: ${
          e instanceof Error ? e.message : "未知のエラー"
        }`
      );
    }
  };

  // フォーマット処理
  const formatObject = () => {
    try {
      if (!inputText.trim()) {
        setFormattedJson("");
        setParsedData(null);
        setError(null);
        return;
      }

      // オブジェクト文字列をパース
      const parsed = parseObjectString(inputText);
      setParsedData(parsed);

      // JSONとして整形
      const formatted = JSON.stringify(
        parsed,
        null,
        isMinified ? 0 : indentSize
      );
      setFormattedJson(formatted);

      setError(null);
    } catch (e) {
      setError(`${e instanceof Error ? e.message : "未知のエラー"}`);
      setFormattedJson("");
      setParsedData(null);
    }
  };

  // サンプルをセット
  const setSampleText = () => {
    const sample = `UserProfile {id=a123-456b-789c-def0, name=山田太郎, email=yamada@example.com, age=32, isActive=true, role=UserRole.MEMBER, address=Address {street=桜町3-2-1, city=東京, zipCode=123-4567, country=日本}, preferences=Preferences {theme=DARK, notifications=true, language=ja-JP}, registrationDate=2023-04-15T09:30:45.123456Z, lastLogin=2024-02-20T18:45:22.987654Z, tags=[programming, technology, gaming], friends=[Friend {id=f123, name=佐藤花子}, Friend {id=f456, name=鈴木次郎}], stats=Stats {postsCount=42, commentsCount=128, likesCount=256}, settings=null}`;
    setInputText(sample);
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
    setInputText("");
    setFormattedJson("");
    setParsedData(null);
    setError(null);
  };

  // 整形/圧縮ボタンのクリック処理
  const toggleMinify = () => {
    setIsMinified(!isMinified);
    if (parsedData) {
      setFormattedJson(
        JSON.stringify(parsedData, null, !isMinified ? 0 : indentSize)
      );
    }
  };

  // ツリービューのコンポーネント
  const JsonTreeView: React.FC<{
    data: any;
    level?: number;
  }> = ({ data, level = 0 }) => {
    const getType = (value: any): string => {
      if (value === null) return "null";
      if (Array.isArray(value)) return "array";
      return typeof value;
    };

    // インデント用のスペース
    const indent = "  ".repeat(level);

    if (data === null) {
      return (
        <div className="text-muted-foreground">{indent}null</div>
      );
    }

    // クラス情報を表示
    if (data.__class) {
      const className = data.__class;
      const { __class, ...rest } = data;

      return (
        <div>
          <div className="text-purple-600 dark:text-purple-400 font-semibold">
            {indent}
            {className} {"{"}
          </div>
          <div className="pl-4">
            {Object.entries(rest).map(([key, value], index) => (
              <div key={key}>
                <span className="text-primary">{key}</span>
                <span className="text-muted-foreground"> = </span>
                {getType(value) === "object" ? (
                  <JsonTreeView data={value} level={level + 1} />
                ) : getType(value) === "array" ? (
                  <ArrayView data={value as any[]} level={level + 1} />
                ) : (
                  <ValueView value={value} />
                )}
                {index < Object.keys(rest).length - 1 && (
                  <span className="text-muted-foreground">,</span>
                )}
              </div>
            ))}
          </div>
          <div>
            {indent}
            {"}"}
          </div>
        </div>
      );
    }

    // Enum型の表示
    if (data.__type === "ENUM") {
      return (
        <span className="text-orange-600 dark:text-orange-400">
          {data.__enum}.{data.value}
        </span>
      );
    }

    // 通常のオブジェクト
    return (
      <div>
        <div className="text-muted-foreground">
          {indent}
          {"{"}
        </div>
        <div className="pl-4">
          {Object.entries(data).map(([key, value], index) => (
            <div key={key}>
              <span className="text-primary">{key}</span>
              <span className="text-muted-foreground">: </span>
              {getType(value) === "object" ? (
                <JsonTreeView data={value} level={level + 1} />
              ) : getType(value) === "array" ? (
                <ArrayView data={value as any[]} level={level + 1} />
              ) : (
                <ValueView value={value} />
              )}
              {index < Object.keys(data).length - 1 && (
                <span className="text-muted-foreground">,</span>
              )}
            </div>
          ))}
        </div>
        <div>
          {indent}
          {"}"}
        </div>
      </div>
    );
  };

  // 配列表示コンポーネント
  const ArrayView: React.FC<{
    data: any[];
    level: number;
  }> = ({ data, level }) => {
    const indent = "  ".repeat(level);

    if (data.length === 0) {
      return <span className="text-muted-foreground">[]</span>;
    }

    return (
      <div>
        <div className="text-muted-foreground">[</div>
        <div className="pl-4">
          {data.map((item, index) => (
            <div key={index}>
              {typeof item === "object" && item !== null ? (
                <JsonTreeView data={item} level={level + 1} />
              ) : (
                <ValueView value={item} />
              )}
              {index < data.length - 1 && (
                <span className="text-muted-foreground">,</span>
              )}
            </div>
          ))}
        </div>
        <div className="text-muted-foreground">{indent}]</div>
      </div>
    );
  };

  // 値表示コンポーネント
  const ValueView: React.FC<{ value: any }> = ({ value }) => {
    if (value === null) {
      return <span className="text-muted-foreground">null</span>;
    }

    switch (typeof value) {
      case "string":
        return (
          <span className="text-green-600 dark:text-green-400">
            {value}&quot;
          </span>
        );
      case "number":
        return (
          <span className="text-primary">{value}</span>
        );
      case "boolean":
        return (
          <span className="text-purple-600 dark:text-purple-400">
            {value.toString()}
          </span>
        );
      default:
        return <span>{String(value)}</span>;
    }
  };

  return (
    <main className="container mx-auto w-full mt-14 px-4 md:px-8 lg:px-16">
      <div className="mx-auto lg:w-9/12">
        <header className="text-center my-8">
          <h1 className="text-4xl font-bold mb-4">
            オブジェクト文字列フォーマッター
          </h1>
          <p className="text-lg text-muted-foreground">
            Dart/Java/Kotlinなどのオブジェクト文字列を整形して見やすく表示します
          </p>
        </header>

        <div className="grid grid-cols-1 gap-6 mb-8">
          {/* 入力エリア */}
          <div className="bg-card rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4 border-b border-border-primary pb-2 text-foreground">
              オブジェクト文字列入力
            </h2>

            <div className="mb-4">
              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                className="w-full h-64 p-4 border border-border-primary rounded-lg focus:ring-2 focus:ring-primary focus:border-primary bg-input text-foreground font-mono text-sm"
                placeholder="ここにオブジェクト文字列を入力またはペーストしてください..."
              ></textarea>
            </div>

            <div className="flex flex-wrap gap-4 mb-4">
              <button
                onClick={formatObject}
                className="px-4 py-2 bg-primary hover:bg-primary/80 text-primary-foreground rounded-lg transition duration-200"
              >
                フォーマット
              </button>
              <button
                onClick={setSampleText}
                className="px-4 py-2 bg-muted text-foreground rounded-lg hover:bg-muted-foreground hover:text-background transition duration-200"
              >
                サンプルをセット
              </button>
              <button
                onClick={clearAll}
                className="px-4 py-2 bg-muted text-foreground rounded-lg hover:bg-muted-foreground hover:text-background transition duration-200"
              >
                クリア
              </button>
            </div>
          </div>

          {/* オプション */}
          <div className="bg-card rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4 border-b border-border-primary pb-2 text-foreground">
              オプション
            </h2>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center">
                <label htmlFor="indentSize" className="mr-2 text-foreground">
                  インデントサイズ:
                </label>
                <select
                  id="indentSize"
                  value={indentSize}
                  onChange={(e) => {
                    setIndentSize(Number(e.target.value));
                    if (parsedData && !isMinified) {
                      setFormattedJson(
                        JSON.stringify(parsedData, null, Number(e.target.value))
                      );
                    }
                  }}
                  disabled={isMinified}
                  className="px-2 py-1 border border-border-primary rounded-lg bg-input text-foreground"
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
                    ? "bg-primary text-primary-foreground hover:bg-primary/80"
                    : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                }`}
              >
                {isMinified ? "整形表示" : "圧縮表示"}
              </button>

              <div className="flex items-center">
                <label htmlFor="viewMode" className="mr-2 text-foreground">
                  表示モード:
                </label>
                <select
                  id="viewMode"
                  value={viewMode}
                  onChange={(e) =>
                    setViewMode(e.target.value as "formatted" | "tree")
                  }
                  className="px-2 py-1 border border-border-primary rounded-lg bg-input text-foreground"
                >
                  <option value="formatted">JSON形式</option>
                  <option value="tree">ツリービュー</option>
                </select>
              </div>
            </div>
          </div>

          {/* 結果表示 */}
          {(formattedJson || error) && (
            <div className="bg-card rounded-lg shadow p-6">
              <div className="flex justify-between items-center mb-4 border-b border-border-primary pb-2 text-foreground">
                <h2 className="text-xl font-semibold">変換結果</h2>
                {formattedJson && (
                  <button
                    onClick={copyToClipboard}
                    className="px-3 py-1 bg-muted text-foreground rounded-lg hover:bg-muted-foreground hover:text-background transition duration-200 text-sm"
                  >
                    {copySuccess ? "コピーしました!" : "コピー"}
                  </button>
                )}
              </div>

              {error ? (
                <div className="bg-destructive/10 text-destructive p-4 rounded-lg">
                  {error}
                </div>
              ) : (
                <div>
                  {viewMode === "formatted" && formattedJson && (
                    <pre className="bg-code-bg p-4 rounded-lg overflow-auto max-h-96 text-sm font-mono">
                      {formattedJson}
                    </pre>
                  )}

                  {viewMode === "tree" && parsedData && (
                    <div className="bg-code-bg p-4 rounded-lg overflow-auto max-h-96">
                      <JsonTreeView data={parsedData} />
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* 使い方 */}
          <div className="bg-card rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4 border-b border-border-primary pb-2 text-foreground">使い方</h2>
            <ul className="list-disc list-inside space-y-2 text-foreground">
              <li>
                Java/Kotlinなどのオブジェクト文字列を入力欄に貼り付けます。例：
                <pre className="bg-code-bg p-2 rounded-lg overflow-auto mt-2 text-xs">
                  User {"{"}id=123, name=John Doe, roles=[ADMIN, USER]{"}"}
                </pre>
              </li>
              <li>
                「フォーマット」ボタンをクリックすると、整形された形式で表示されます
              </li>
              <li>
                「表示モード」で以下の表示形式を選択できます:
                <ul className="list-disc list-inside ml-4 mt-1">
                  <li>JSON形式: JSON形式に変換して表示</li>
                  <li>ツリービュー: 階層構造を視覚的に表示</li>
                </ul>
              </li>
              <li>「整形表示/圧縮表示」ボタンで表示形式を切り替えられます</li>
              <li>
                「コピー」ボタンで変換結果をクリップボードにコピーできます
              </li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ObjectFormatterClient;
