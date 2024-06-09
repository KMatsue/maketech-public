"use client";

import React, { FC, useState } from "react";
import type { CodeBlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import { ClipboardIcon, CheckIcon } from "@heroicons/react/24/outline";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
// import { xonokai } from "react-syntax-highlighter/dist/cjs/styles/prism";
import { tomorrow } from "react-syntax-highlighter/dist/cjs/styles/prism";

type Props = {
  block: CodeBlockObjectResponse;
};

const Code: FC<Props> = ({ block }) => {
  const [copied, setCopied] = useState(false);

  const text = block.code.rich_text.reduce(
    (a: string, b) => a + b.plain_text,
    ""
  );

  const language = block.code.language
    ? block.code.language.toUpperCase()
    : "TEXT";

  const handleCopy = () => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // 2秒後にコピー完了の表示を消す
    });
  };

  return (
    <div className="relative my-4 rounded-md overflow-hidden bg-[#1e1e1e]">
      <div className="absolute top-0 left-0 bg-[#2e2e2e] text-[#cfcfcf] text-xs font-mono font-bold p-2 rounded-br-md">
        {language}
      </div>
      <button
        onClick={handleCopy}
        className="absolute top-0 right-0 m-2 bg-[#2e2e2e] text-[#cfcfcf] rounded-md hover:bg-[#3e3e3e] focus:outline-none flex items-center space-x-1"
        aria-label="Copy code"
      >
        {copied ? (
          <>
            <CheckIcon className="w-4 h-4" />
            <span className="text-xs">Copied</span>
          </>
        ) : (
          <>
            <ClipboardIcon className="w-4 h-4" />
            <span className="text-xs">Copy code</span>
          </>
        )}
      </button>
      <SyntaxHighlighter
        language={block.code.language}
        style={tomorrow}
        showLineNumbers
        showInlineLineNumbers
        customStyle={{ margin: 0, paddingTop: "2.5rem" }}
        codeTagProps={{
          style: { fontFamily: "monospace", fontSize: "0.875rem" },
        }}
        aria-label={`Code block in ${language}`}
      >
        {text}
      </SyntaxHighlighter>
    </div>
  );
};

export default Code;
