"use client";

import React, { useState, useEffect } from "react";

const RegexTesterClient = () => {
  const [pattern, setPattern] = useState("");
  const [flags, setFlags] = useState("g");
  const [testString, setTestString] = useState("");
  const [matches, setMatches] = useState<
    { match: string; index: number; length: number }[]
  >([]);
  const [replacementPattern, setReplacementPattern] = useState("");
  const [replacementResult, setReplacementResult] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [highlightedText, setHighlightedText] = useState<React.ReactNode>(null);
  const [matchCount, setMatchCount] = useState(0);

  // フラグのオプション
  const flagOptions = [
    { value: "g", label: "g (global)", description: "すべての一致を検索" },
    {
      value: "i",
      label: "i (ignoreCase)",
      description: "大文字と小文字を区別しない",
    },
    { value: "m", label: "m (multiline)", description: "複数行に対応" },
    {
      value: "s",
      label: "s (dotAll)",
      description: "ドット (.) が改行にもマッチ",
    },
    {
      value: "u",
      label: "u (unicode)",
      description: "Unicodeパターンとして扱う",
    },
    { value: "y", label: "y (sticky)", description: "先頭からのみマッチ" },
  ];

  // 正規表現パターンとテストテキストからマッチを計算
  useEffect(() => {
    if (!pattern || !testString) {
      setMatches([]);
      setHighlightedText(testString);
      setMatchCount(0);
      setError(null);
      return;
    }

    try {
      // 正規表現オブジェクトを作成
      const regex = new RegExp(pattern, flags);
      const matches: { match: string; index: number; length: number }[] = [];

      // グローバルフラグが設定されている場合はすべてのマッチを取得
      if (flags.includes("g")) {
        let match;
        while ((match = regex.exec(testString)) !== null) {
          matches.push({
            match: match[0],
            index: match.index,
            length: match[0].length,
          });

          // 無限ループ防止 (空文字にマッチし続ける場合)
          if (match[0].length === 0) {
            regex.lastIndex++;
          }
        }
      } else {
        // グローバルフラグがない場合は最初のマッチのみ
        const match = regex.exec(testString);
        if (match) {
          matches.push({
            match: match[0],
            index: match.index,
            length: match[0].length,
          });
        }
      }

      setMatches(matches);
      setMatchCount(matches.length);
      setError(null);

      // ハイライト付きのテキストを生成
      highlightMatches(testString, matches);

      // 置換結果を更新
      if (replacementPattern) {
        try {
          const resultText = testString.replace(regex, replacementPattern);
          setReplacementResult(resultText);
        } catch (e) {
          if (e instanceof Error) {
            setReplacementResult(`置換エラー: ${e.message}`);
          }
        }
      }
    } catch (e) {
      if (e instanceof Error) {
        setError(`正規表現エラー: ${e.message}`);
        setMatches([]);
        setHighlightedText(testString);
        setMatchCount(0);
      }
    }
  }, [pattern, flags, testString, replacementPattern]);

  // マッチした部分をハイライト表示
  const highlightMatches = (
    text: string,
    matches: { index: number; length: number }[]
  ) => {
    if (matches.length === 0) {
      setHighlightedText(text);
      return;
    }

    // マッチ位置でテキストを分割
    const parts: React.ReactNode[] = [];
    let lastIndex = 0;

    // マッチを順番に処理
    matches.forEach((match, i) => {
      // マッチの前のテキスト
      if (match.index > lastIndex) {
        parts.push(
          <span key={`t-${i}`}>{text.substring(lastIndex, match.index)}</span>
        );
      }

      // マッチしたテキスト
      parts.push(
        <span
          key={`m-${i}`}
          className="bg-yellow-300 dark:bg-yellow-600 px-0.5 rounded"
          title={`Match #${i + 1}`}
        >
          {text.substring(match.index, match.index + match.length)}
        </span>
      );

      lastIndex = match.index + match.length;
    });

    // 最後のマッチの後のテキスト
    if (lastIndex < text.length) {
      parts.push(<span key="t-last">{text.substring(lastIndex)}</span>);
    }

    setHighlightedText(<>{parts}</>);
  };

  // フラグの切り替え
  const toggleFlag = (flag: string) => {
    if (flags.includes(flag)) {
      setFlags(flags.replace(flag, ""));
    } else {
      setFlags(flags + flag);
    }
  };

  return (
    <main className="container mx-auto w-full mt-14 px-4 md:px-8 lg:px-16">
      <div className="mx-auto lg:w-9/12">
        <header className="text-center my-8">
          <h1 className="text-4xl font-bold mb-4">正規表現テスター</h1>
          <p className="text-lg text-muted-foreground">
            正規表現パターンをテストしてマッチングや置換結果を確認できます
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* 正規表現パターン入力 */}
          <div className="bg-card rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4 border-b border-border-primary pb-2 text-foreground">
              正規表現パターン
            </h2>

            <div className="mb-6">
              <label
                htmlFor="pattern"
                className="block font-medium mb-2 text-foreground"
              >
                パターン
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="pattern"
                  value={pattern}
                  onChange={(e) => setPattern(e.target.value)}
                  className="w-full px-4 py-2 border border-border-primary rounded-lg focus:ring-2 focus:ring-primary focus:border-primary bg-input text-foreground"
                  placeholder="例: \b\w+\b"
                />
                <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">
                  /regex/
                </span>
              </div>
            </div>

            <div className="mb-6">
              <label className="block font-medium mb-2 text-foreground">
                フラグ
              </label>
              <div className="flex flex-wrap gap-2">
                {flagOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => toggleFlag(option.value)}
                    className={`px-3 py-1 rounded-md text-sm flex items-center ${
                      flags.includes(option.value)
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-foreground"
                    }`}
                    title={option.description}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <label
                htmlFor="testString"
                className="block font-medium mb-2 text-foreground"
              >
                テスト文字列
              </label>
              <textarea
                id="testString"
                value={testString}
                onChange={(e) => setTestString(e.target.value)}
                className="w-full h-40 px-4 py-2 border border-border-primary rounded-lg focus:ring-2 focus:ring-primary focus:border-primary bg-input text-foreground"
                placeholder="テスト対象の文字列をここに入力してください"
              ></textarea>
            </div>

            <div className="mb-6">
              <label
                htmlFor="replacement"
                className="block font-medium mb-2 text-foreground"
              >
                置換文字列 (オプション)
              </label>
              <input
                type="text"
                id="replacement"
                value={replacementPattern}
                onChange={(e) => setReplacementPattern(e.target.value)}
                className="w-full px-4 py-2 border border-border-primary rounded-lg focus:ring-2 focus:ring-primary focus:border-primary bg-input text-foreground"
                placeholder="例: $& または $1"
              />
            </div>
          </div>

          {/* 結果表示 */}
          <div className="bg-card rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4 border-b border-border-primary pb-2 text-foreground">
              結果
            </h2>

            {error ? (
              <div className="bg-destructive/10 text-destructive p-4 rounded-lg mb-4">
                {error}
              </div>
            ) : (
              <>
                <div className="mb-4">
                  <span className="font-medium text-foreground">マッチ数:</span>{" "}
                  <span className="text-foreground">{matchCount}</span>
                </div>

                <div className="mb-6">
                  <h3 className="font-medium mb-2 text-foreground">
                    マッチング結果:
                  </h3>
                  <div className="bg-muted p-4 rounded-lg overflow-auto max-h-40 whitespace-pre-wrap">
                    {highlightedText || (
                      <span className="text-muted-foreground">
                        テキストとパターンを入力してください
                      </span>
                    )}
                  </div>
                </div>

                {matches.length > 0 && (
                  <div className="mb-6">
                    <h3 className="font-medium mb-2 text-foreground">
                      マッチした文字列:
                    </h3>
                    <div className="bg-muted p-4 rounded-lg overflow-auto max-h-40">
                      <ul className="list-disc pl-4 space-y-1">
                        {matches.map((match, index) => (
                          <li key={index}>
                            <span className="font-mono">
                              &quot;{match.match}&quot;
                            </span>
                            <span className="text-sm text-muted-foreground ml-2">
                              (位置: {match.index})
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}

                {replacementPattern && (
                  <div className="mb-6">
                    <h3 className="font-medium mb-2 text-foreground">
                      置換結果:
                    </h3>
                    <div className="bg-muted p-4 rounded-lg overflow-auto max-h-40 whitespace-pre-wrap">
                      {replacementResult || (
                        <span className="text-muted-foreground">
                          置換結果はここに表示されます
                        </span>
                      )}
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>

        <div className="bg-card rounded-lg shadow p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4 border-b border-border-primary pb-2 text-foreground">
            使い方
          </h2>
          <ul className="list-disc list-inside space-y-2 text-foreground">
            <li>
              「パターン」欄に正規表現パターンを入力してください（前後の /
              は不要です）
            </li>
            <li>
              「フラグ」で検索オプションを選択できます（g: 全マッチ、i:
              大小文字区別しない、など）
            </li>
            <li>
              「テスト文字列」に検索対象のテキストを入力すると、マッチ結果がハイライト表示されます
            </li>
            <li>
              「置換文字列」に入力すると、置換結果も表示されます（$1, $2
              などでグループ参照可能）
            </li>
            <li>
              結果パネルでは、マッチ数、マッチ位置、ハイライト表示されたテキストを確認できます
            </li>
          </ul>
        </div>

        <div className="bg-card rounded-lg shadow p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4 border-b border-border-primary pb-2 text-foreground">
            正規表現チートシート
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-medium mb-2 text-foreground">
                基本的なパターン
              </h3>
              <ul className="text-sm space-y-1 text-foreground">
                <li>
                  <code className="bg-muted px-1 rounded">\d</code> - 数字 [0-9]
                </li>
                <li>
                  <code className="bg-muted px-1 rounded">\w</code> - 単語文字
                  [a-zA-Z0-9_]
                </li>
                <li>
                  <code className="bg-muted px-1 rounded">\s</code> - 空白文字
                </li>
                <li>
                  <code className="bg-muted px-1 rounded">.</code> -
                  任意の1文字（改行以外）
                </li>
                <li>
                  <code className="bg-muted px-1 rounded">[abc]</code> -
                  a、b、またはcのいずれか
                </li>
                <li>
                  <code className="bg-muted px-1 rounded">[^abc]</code> -
                  a、b、c以外の任意の文字
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-medium mb-2 text-foreground">
                アンカーと境界
              </h3>
              <ul className="text-sm space-y-1 text-foreground">
                <li>
                  <code className="bg-muted px-1 rounded">^</code> - 行の先頭
                </li>
                <li>
                  <code className="bg-muted px-1 rounded">$</code> - 行の末尾
                </li>
                <li>
                  <code className="bg-muted px-1 rounded">\b</code> - 単語境界
                </li>
                <li>
                  <code className="bg-muted px-1 rounded">\B</code> - 非単語境界
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-medium mb-2 text-foreground">繰り返し</h3>
              <ul className="text-sm space-y-1 text-foreground">
                <li>
                  <code className="bg-muted px-1 rounded">*</code> -
                  0回以上の繰り返し
                </li>
                <li>
                  <code className="bg-muted px-1 rounded">+</code> -
                  1回以上の繰り返し
                </li>
                <li>
                  <code className="bg-muted px-1 rounded">?</code> -
                  0回または1回
                </li>
                <li>
                  <code className="bg-muted px-1 rounded">{"{n}"}</code> -
                  ちょうどn回
                </li>
                <li>
                  <code className="bg-muted px-1 rounded">{"{n,}"}</code> -
                  n回以上
                </li>
                <li>
                  <code className="bg-muted px-1 rounded">{"{n,m}"}</code> -
                  n回以上m回以下
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-medium mb-2 text-foreground">グループとOR</h3>
              <ul className="text-sm space-y-1 text-foreground">
                <li>
                  <code className="bg-muted px-1 rounded">(abc)</code> -
                  グループ
                </li>
                <li>
                  <code className="bg-muted px-1 rounded">a|b</code> - aまたはb
                </li>
                <li>
                  <code className="bg-muted px-1 rounded">(?:abc)</code> -
                  非キャプチャグループ
                </li>
                <li>
                  <code className="bg-muted px-1 rounded">
                    (?&lt;name&gt;abc)
                  </code>{" "}
                  - 名前付きグループ
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default RegexTesterClient;
