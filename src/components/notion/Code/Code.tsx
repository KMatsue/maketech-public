"use client";

import React, { FC } from "react";
import type { CodeBlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { xonokai } from "react-syntax-highlighter/dist/cjs/styles/prism";

type Props = {
  block: CodeBlockObjectResponse;
};

const Code: FC<Props> = ({ block }) => {
  const text = block.code.rich_text.reduce(
    (a: string, b) => a + b.plain_text,
    ""
  );

  return (
    <SyntaxHighlighter
      language={block.code.language}
      style={xonokai}
      showLineNumbers
      showInlineLineNumbers
      className="rounded-md mt-2 mb-4"
    >
      {text}
    </SyntaxHighlighter>
  );
};

export default Code;
