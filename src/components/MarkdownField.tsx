"use client";

import React from "react";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import remarkBreaks from "remark-breaks";
import { vscDarkPlus } from "react-syntax-highlighter/dist/cjs/styles/prism";

const MarkdownField = ({ post }: { post: { markdown: string } }) => {
  console.log(post);
  return (
    <ReactMarkdown
      remarkPlugins={[remarkBreaks]}
      components={{
        code({ node, inline, className, children, ...props }) {
          const match = /language-(\w+)/.exec(className || "");
          return !inline && match ? (
            <SyntaxHighlighter
              {...props}
              style={vscDarkPlus}
              language={match[1]}
              PreTag="div"
            >
              {String(children).replace(/\n$/, "")}
            </SyntaxHighlighter>
          ) : (
            <code {...props} className={className}>
              {children}
            </code>
          );
        },
        p: ({ children }) => <p style={{ marginBottom: "1em" }}>{children}</p>,
      }}
    >
      {post.markdown}
    </ReactMarkdown>
  );
};

export default MarkdownField;
