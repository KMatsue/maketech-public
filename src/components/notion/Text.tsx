import React, { FC } from "react";
import type { RichTextItemResponse } from "@notionhq/client/build/src/api-endpoints";

type Props = {
  text: Array<RichTextItemResponse>;
};

export const Text: FC<Props> = ({ text }) => {
  if (!text) {
    return null;
  }
  if (text.length === 0) {
    return <span className="block h-6" />;
  }
  return text.map((value) => {
    if ("text" in value) {
      const {
        annotations: { bold, code, color, italic, strikethrough, underline },
        text: { content, link },
      } = value;
      return (
        <span
          className={[
            bold ? "font-bold" : "",
            code
              ? "bg-slate-200 dark:bg-slate-500 text-red-500 px-1 rounded-sm"
              : "",
            italic ? "italic" : "",
            strikethrough ? "line-through" : "",
            underline ? "underline" : "",
          ].join(" ")}
          style={color !== "default" ? { color } : {}}
          key={content}
        >
          {link ? <a href={link.url}>{content}</a> : content}
        </span>
      );
    }
  });
};
