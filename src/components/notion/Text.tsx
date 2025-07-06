import React, { FC } from "react";
import type { RichTextItemResponse } from "@notionhq/client/build/src/api-endpoints";
import ExternalLinkWrapper from "../common/ExternalLinkWrapper";

type Props = {
  text: Array<RichTextItemResponse>;
};

export const Text: FC<Props> = ({ text }) => {
  if (!text) {
    return null;
  }
  if (text.length === 0) {
    return <span className="block h-4" />;
  }
  return text.map((value) => {
    if ("text" in value) {
      const {
        annotations: { bold, code, color, italic, strikethrough, underline },
        text: { content, link },
      } = value;

      const classNames = [
        bold ? "font-bold" : "",
        code
          ? "bg-muted text-destructive px-1 rounded-sm"
          : "",
        italic ? "italic" : "",
        strikethrough ? "line-through" : "",
        underline ? "underline" : "",
      ]
        .filter(Boolean)
        .join(" ");

      return (
        <span
          className={classNames}
          style={color !== "default" ? { color } : {}}
          key={content}
        >
          {link ? (
            <ExternalLinkWrapper href={link.url} showIcon={!code}>
              {content}
            </ExternalLinkWrapper>
          ) : (
            content
          )}
        </span>
      );
    }
  });
};
