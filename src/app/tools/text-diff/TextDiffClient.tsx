"use client";

import React, { useState, useEffect } from "react";
import * as diff from "diff";

type DiffLine = {
  content: string;
  type: "normal" | "added" | "removed";
  lineNumber: { old: number | null; new: number | null };
};

const TextDiffClient = () => {
  const [oldText, setOldText] = useState("");
  const [newText, setNewText] = useState("");
  const [diffResult, setDiffResult] = useState<DiffLine[]>([]);
  const [viewMode, setViewMode] = useState<"split" | "unified">("unified");
  const [diffStats, setDiffStats] = useState({
    added: 0,
    removed: 0,
    changed: 0,
  });
  const [ignoreCase, setIgnoreCase] = useState(false);
  const [ignoreWhitespace, setIgnoreWhitespace] = useState(false);
  const [showLineNumbers, setShowLineNumbers] = useState(true);

  // 差分計算関数
  useEffect(() => {
    if (oldText === "" && newText === "") {
      setDiffResult([]);
      setDiffStats({ added: 0, removed: 0, changed: 0 });
      return;
    }

    let oldTextProcessed = oldText;
    let newTextProcessed = newText;

    // オプションに応じたテキスト処理
    if (ignoreCase) {
      oldTextProcessed = oldTextProcessed.toLowerCase();
      newTextProcessed = newTextProcessed.toLowerCase();
    }

    if (ignoreWhitespace) {
      oldTextProcessed = oldTextProcessed.replace(/\s+/g, " ").trim();
      newTextProcessed = newTextProcessed.replace(/\s+/g, " ").trim();
    }

    // 行単位の差分を計算
    const diffLines = diff.diffLines(oldTextProcessed, newTextProcessed);

    // 表示用の配列に変換
    let oldLineNumber = 1;
    let newLineNumber = 1;
    const lines: DiffLine[] = [];

    let addedLines = 0;
    let removedLines = 0;
    let changedLines = 0;

    diffLines.forEach((part: Diff.Change) => {
      const partLines = part.value.split("\n");
      // 最後の空の行を削除（最後が改行で終わる場合）
      if (partLines[partLines.length - 1] === "") {
        partLines.pop();
      }

      partLines.forEach((line: string) => {
        if (part.added) {
          lines.push({
            content: line,
            type: "added",
            lineNumber: { old: null, new: newLineNumber++ },
          });
          addedLines++;
        } else if (part.removed) {
          lines.push({
            content: line,
            type: "removed",
            lineNumber: { old: oldLineNumber++, new: null },
          });
          removedLines++;
        } else {
          lines.push({
            content: line,
            type: "normal",
            lineNumber: { old: oldLineNumber++, new: newLineNumber++ },
          });
        }
      });
    });

    // 変更された行の数を計算 (追加と削除の最小値)
    changedLines = Math.min(addedLines, removedLines);
    // 純粋な追加・削除を計算
    addedLines = addedLines - changedLines;
    removedLines = removedLines - changedLines;

    setDiffResult(lines);
    setDiffStats({
      added: addedLines,
      removed: removedLines,
      changed: changedLines,
    });
  }, [oldText, newText, ignoreCase, ignoreWhitespace]);

  // テキストエリアの高さ調整
  const adjustTextareaHeight = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    e.target.style.height = "auto";
    e.target.style.height = `${e.target.scrollHeight}px`;
  };

  // 例のテキストをセット
  const setExampleTexts = () => {
    setOldText(
      `これはサンプルテキストです。
この行は削除されます。
この行は変更されます。
この行は変更なしです。
これは最後の行です。`
    );

    setNewText(
      `これはサンプルテキストです。
この行は新しく追加されました。
この行は大きく変更されました。
この行は変更なしです。
これは新しい行です。
これは最後の行です。`
    );
  };

  return (
    <main className="container mx-auto w-full mt-14 px-4 md:px-8 lg:px-16">
      <div className="mx-auto lg:w-9/12">
        <header className="text-center my-8">
          <h1 className="text-4xl font-bold mb-4">テキスト差分比較（Diff）</h1>
          <p className="text-lg text-gray-700 dark:text-gray-300">
            2つのテキストの違いを視覚的に比較・確認できます
          </p>
        </header>

        {/* 入力エリア */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4 border-b pb-2">
              元のテキスト
            </h2>
            <textarea
              value={oldText}
              onChange={(e) => {
                setOldText(e.target.value);
                adjustTextareaHeight(e);
              }}
              className="w-full min-h-40 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-gray-100 font-mono"
              placeholder="元のテキストをここに入力"
            ></textarea>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4 border-b pb-2">
              新しいテキスト
            </h2>
            <textarea
              value={newText}
              onChange={(e) => {
                setNewText(e.target.value);
                adjustTextareaHeight(e);
              }}
              className="w-full min-h-40 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-gray-100 font-mono"
              placeholder="新しいテキストをここに入力"
            ></textarea>
          </div>
        </div>

        {/* オプションとボタン */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-8">
          <div className="flex flex-wrap gap-4 justify-between items-center">
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="ignoreCase"
                  checked={ignoreCase}
                  onChange={(e) => setIgnoreCase(e.target.checked)}
                  className="mr-2"
                />
                <label htmlFor="ignoreCase">大文字/小文字を無視</label>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="ignoreWhitespace"
                  checked={ignoreWhitespace}
                  onChange={(e) => setIgnoreWhitespace(e.target.checked)}
                  className="mr-2"
                />
                <label htmlFor="ignoreWhitespace">空白を無視</label>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="showLineNumbers"
                  checked={showLineNumbers}
                  onChange={(e) => setShowLineNumbers(e.target.checked)}
                  className="mr-2"
                />
                <label htmlFor="showLineNumbers">行番号を表示</label>
              </div>
            </div>

            <div className="flex gap-4">
              <select
                value={viewMode}
                onChange={(e) =>
                  setViewMode(e.target.value as "split" | "unified")
                }
                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700"
              >
                <option value="unified">統合表示</option>
                <option value="split">分割表示</option>
              </select>

              <button
                onClick={setExampleTexts}
                className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition duration-200"
              >
                サンプルをセット
              </button>
            </div>
          </div>
        </div>

        {/* 差分統計 */}
        {diffResult.length > 0 && (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4 border-b pb-2">
              差分統計
            </h2>
            <div className="flex flex-wrap gap-6 justify-center text-center">
              <div>
                <span className="text-3xl font-bold block">
                  {diffStats.added}
                </span>
                <span className="text-green-600 dark:text-green-400">
                  追加された行
                </span>
              </div>
              <div>
                <span className="text-3xl font-bold block">
                  {diffStats.removed}
                </span>
                <span className="text-red-600 dark:text-red-400">
                  削除された行
                </span>
              </div>
              <div>
                <span className="text-3xl font-bold block">
                  {diffStats.changed}
                </span>
                <span className="text-yellow-600 dark:text-yellow-400">
                  変更された行
                </span>
              </div>
              <div>
                <span className="text-3xl font-bold block">
                  {diffResult.filter((line) => line.type === "normal").length}
                </span>
                <span className="text-gray-600 dark:text-gray-400">
                  変更なしの行
                </span>
              </div>
            </div>
          </div>
        )}

        {/* 差分結果表示 - 統合表示 */}
        {diffResult.length > 0 && viewMode === "unified" && (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-8 overflow-x-auto">
            <h2 className="text-xl font-semibold mb-4 border-b pb-2">
              差分結果（統合表示）
            </h2>
            <table className="w-full border-collapse font-mono text-sm">
              <tbody>
                {diffResult.map((line, index) => (
                  <tr
                    key={index}
                    className={`
                      ${
                        line.type === "added"
                          ? "bg-green-100 dark:bg-green-900"
                          : ""
                      } 
                      ${
                        line.type === "removed"
                          ? "bg-red-100 dark:bg-red-900"
                          : ""
                      }
                    `}
                  >
                    {showLineNumbers && (
                      <>
                        <td className="text-right pr-2 text-gray-500 dark:text-gray-400 w-12 select-none border-r">
                          {line.lineNumber.old !== null
                            ? line.lineNumber.old
                            : ""}
                        </td>
                        <td className="text-right pr-2 text-gray-500 dark:text-gray-400 w-12 select-none border-r">
                          {line.lineNumber.new !== null
                            ? line.lineNumber.new
                            : ""}
                        </td>
                      </>
                    )}
                    <td className="pl-2 whitespace-pre-wrap">
                      <span className="inline-block w-4">
                        {line.type === "added"
                          ? "+"
                          : line.type === "removed"
                          ? "-"
                          : " "}
                      </span>
                      {line.content}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* 差分結果表示 - 分割表示 */}
        {diffResult.length > 0 && viewMode === "split" && (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-8 overflow-x-auto">
            <h2 className="text-xl font-semibold mb-4 border-b pb-2">
              差分結果（分割表示）
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="font-medium mb-2 text-center">元のテキスト</h3>
                <table className="w-full border-collapse font-mono text-sm">
                  <tbody>
                    {diffResult.map(
                      (line, index) =>
                        line.type !== "added" && (
                          <tr
                            key={index}
                            className={
                              line.type === "removed"
                                ? "bg-red-100 dark:bg-red-900"
                                : ""
                            }
                          >
                            {showLineNumbers && (
                              <td className="text-right pr-2 text-gray-500 dark:text-gray-400 w-12 select-none border-r">
                                {line.lineNumber.old}
                              </td>
                            )}
                            <td className="pl-2 whitespace-pre-wrap">
                              {line.content}
                            </td>
                          </tr>
                        )
                    )}
                  </tbody>
                </table>
              </div>

              <div>
                <h3 className="font-medium mb-2 text-center">新しいテキスト</h3>
                <table className="w-full border-collapse font-mono text-sm">
                  <tbody>
                    {diffResult.map(
                      (line, index) =>
                        line.type !== "removed" && (
                          <tr
                            key={index}
                            className={
                              line.type === "added"
                                ? "bg-green-100 dark:bg-green-900"
                                : ""
                            }
                          >
                            {showLineNumbers && (
                              <td className="text-right pr-2 text-gray-500 dark:text-gray-400 w-12 select-none border-r">
                                {line.lineNumber.new}
                              </td>
                            )}
                            <td className="pl-2 whitespace-pre-wrap">
                              {line.content}
                            </td>
                          </tr>
                        )
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* 使い方 */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4 border-b pb-2">使い方</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
            <li>
              左側のテキストエリアに元のテキスト、右側に新しいテキストを入力またはコピー＆ペーストしてください
            </li>
            <li>自動的に差分が計算され、変更部分がハイライト表示されます</li>
            <li>表示モードを「統合表示」または「分割表示」から選択できます</li>
            <li>
              大文字/小文字の違いや空白の違いを無視するオプションも利用可能です
            </li>
            <li>
              「サンプルをセット」ボタンをクリックすると、使い方を確認するためのサンプルテキストが設定されます
            </li>
          </ul>
        </div>
      </div>
    </main>
  );
};

export default TextDiffClient;
