import React, { FC } from "react";
import styles from "@/app/posts/[slug]/post.module.css";
import type { RichTextItemResponse } from "@notionhq/client/build/src/api-endpoints";

type Props = {
  text: Array<RichTextItemResponse>;
};

export const Text: FC<Props> = ({ text }) => {
  if (!text) {
    return null;
  }
  return text.map((value) => {
    console.log(value);
    if ("text" in value) {
      const {
        annotations: { bold, code, color, italic, strikethrough, underline },
        text: { content, link },
      } = value;
      return (
        <span
          className={[
            bold ? styles.bold : "",
            code ? styles.code : "",
            italic ? styles.italic : "",
            strikethrough ? styles.strikethrough : "",
            underline ? styles.underline : "",
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
