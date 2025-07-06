"use client";

import React, { useState, useEffect, useRef } from "react";

const CharCounterClient = () => {
  const [text, setText] = useState("");
  const [stats, setStats] = useState({
    chars: 0,
    charsNoSpace: 0,
    fullWidthChars: 0,
    halfWidthChars: 0,
    fullWidthAs2Chars: 0, // 全角を2文字としてカウント
    words: 0,
    lines: 0,
    paragraphs: 0,
  });
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    // 文字数カウント処理
    const charsCount = text.length;
    const charsNoSpaceCount = text.replace(/\s/g, "").length;

    // 全角・半角の区別
    let fullWidthCount = 0;
    let halfWidthCount = 0;

    for (let i = 0; i < text.length; i++) {
      const char = text.charAt(i);
      if (char.match(/[^\x01-\x7E\xA1-\xDF]/)) {
        // 全角文字（日本語含む）
        fullWidthCount++;
      } else {
        // 半角文字（英数字、半角カナなど）
        halfWidthCount++;
      }
    }

    // 全角を2文字としてカウント
    const fullWidthAs2CharsCount = fullWidthCount * 2 + halfWidthCount;

    // 単語数カウント（連続する文字をひとつの単語としてカウント）
    const wordsMatch = text.match(/\S+/g);
    const wordsCount = wordsMatch ? wordsMatch.length : 0;

    // 行数カウント
    const linesCount = text === "" ? 0 : text.split(/\r\n|\r|\n/).length;

    // 段落数カウント（空行で区切られたテキストブロック）
    const paragraphsMatch = text.match(/(?:\r\n|\r|\n)?\s*\S+/g);
    const paragraphsCount = paragraphsMatch ? paragraphsMatch.length : 0;

    setStats({
      chars: charsCount,
      charsNoSpace: charsNoSpaceCount,
      fullWidthChars: fullWidthCount,
      halfWidthChars: halfWidthCount,
      fullWidthAs2Chars: fullWidthAs2CharsCount,
      words: wordsCount,
      lines: linesCount,
      paragraphs: paragraphsCount,
    });
  }, [text]);

  const handleClear = () => {
    setText("");
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  };

  return (
    <main className="container mx-auto w-full mt-14 px-4 md:px-8 lg:px-16">
      <div className="mx-auto lg:w-9/12">
        <header className="text-center my-8">
          <h1 className="text-4xl font-bold mb-4">文字数カウンター</h1>
          <p className="text-lg text-muted-foreground">
            テキストの文字数、単語数、行数を瞬時にカウントします
          </p>
        </header>

        <div className="bg-card rounded-lg shadow p-6 mb-8">
          <div className="flex flex-col md:flex-row md:gap-6">
            <div className="w-full mb-6 md:mb-0">
              <div className="mb-4">
                <textarea
                  ref={textareaRef}
                  className="w-full h-64 p-4 border border-border-primary rounded-lg focus:ring-2 focus:ring-primary focus:border-primary bg-input text-foreground"
                  placeholder="ここにテキストを入力または貼り付けてください..."
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                ></textarea>
              </div>
              <div className="flex justify-between">
                <button
                  onClick={handleClear}
                  className="px-4 py-2 bg-muted text-foreground rounded hover:bg-muted-foreground hover:text-background transition duration-200"
                >
                  クリア
                </button>
                <div className="text-sm text-muted-foreground flex items-center">
                  {text.length > 0 && (
                    <span>最終更新: {new Date().toLocaleTimeString()}</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-card rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4 border-b border-border-primary pb-2 text-foreground">
            カウント結果
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="bg-muted p-4 rounded-lg text-center">
              <h3 className="font-medium text-muted-foreground">文字数</h3>
              <p className="text-2xl font-bold text-foreground">
                {stats.chars}
              </p>
            </div>
            <div className="bg-muted p-4 rounded-lg text-center">
              <h3 className="font-medium text-muted-foreground">
                文字数 (空白除く)
              </h3>
              <p className="text-2xl font-bold text-foreground">
                {stats.charsNoSpace}
              </p>
            </div>
            <div className="bg-muted p-4 rounded-lg text-center">
              <h3 className="font-medium text-muted-foreground">全角文字数</h3>
              <p className="text-2xl font-bold text-foreground">
                {stats.fullWidthChars}
              </p>
            </div>
            <div className="bg-muted p-4 rounded-lg text-center">
              <h3 className="font-medium text-muted-foreground">半角文字数</h3>
              <p className="text-2xl font-bold text-foreground">
                {stats.halfWidthChars}
              </p>
            </div>
            <div className="bg-muted p-4 rounded-lg text-center">
              <h3 className="font-medium text-muted-foreground">
                文字数 (全角=2文字)
              </h3>
              <p className="text-2xl font-bold text-foreground">
                {stats.fullWidthAs2Chars}
              </p>
              <p className="text-xs text-muted-foreground">
                全角を2文字としてカウント
              </p>
            </div>
            <div className="bg-muted p-4 rounded-lg text-center">
              <h3 className="font-medium text-muted-foreground">単語数</h3>
              <p className="text-2xl font-bold text-foreground">
                {stats.words}
              </p>
            </div>
            <div className="bg-muted p-4 rounded-lg text-center">
              <h3 className="font-medium text-muted-foreground">行数</h3>
              <p className="text-2xl font-bold text-foreground">
                {stats.lines}
              </p>
            </div>
            <div className="bg-muted p-4 rounded-lg text-center">
              <h3 className="font-medium text-muted-foreground">段落数</h3>
              <p className="text-2xl font-bold text-foreground">
                {stats.paragraphs}
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default CharCounterClient;
