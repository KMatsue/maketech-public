import React from "react";
import { Text } from "@/components/notion/Text";
import styles from "@/app/posts/[slug]/post.module.css";
import Image from "next/image";
import { Quote } from "./Quote/Quote";
import Heading1 from "./Heading1/Heading1";
import Heading3 from "./Heading3/Heading3";
import Heading2 from "./Heading2/Heading2";
import Code from "./Code/Code";
import Paragraph from "./Paragraph/Paragraph";
import Divider from "./Divider/Divider";

import type {
  BlockObjectResponse,
  RichTextItemResponse,
} from "@notionhq/client/build/src/api-endpoints";
import ToDo from "./ToDo/ToDo";
import File from "../File/File";
import Callout from "./Callout/Callout";
import Toggle from "./Toggle/Toggle";

// const RenderBlock = (block: BlockObjectResponse ) => {
const RenderBlock = (block: any) => {
  const { type } = block;

  switch (type) {
    case "paragraph":
      return <Paragraph block={block} />;
    case "heading_1":
      return <Heading1 block={block} />;
    case "heading_2":
      return <Heading2 block={block} />;
    case "heading_3":
      return <Heading3 block={block} />;

    case "bulleted_list": {
      return (
        <ul className="list-disc">
          {block[type].children.map((child: any) => RenderBlock(child))}
        </ul>
      );
    }
    case "numbered_list": {
      return (
        <ol className="list-decimal">
          {block[type].children.map((child: any) => RenderBlock(child))}
        </ol>
      );
    }
    case "bulleted_list_item":
    case "numbered_list_item":
      return (
        <li key={block.id}>
          <Text text={block[type].rich_text} />
          {!!block.has_children && renderNestedList(block)}
        </li>
      );
    case "callout":
      return <Callout block={block} />;
    case "to_do":
      return <ToDo block={block} />;
    case "toggle":
      return <Toggle block={block} />;
    case "child_page":
      return (
        <div className={styles.childPage}>
          <strong>{block[type].title}</strong>
          {block.children.map((child: any) => RenderBlock(child))}
        </div>
      );
    case "image":
      const src =
        block[type].type === "external"
          ? block[type].external.url
          : block[type].file.url;
      const caption = block[type].caption
        ? block[type].caption[0]?.plain_text
        : "";
      return (
        <figure>
          <Image
            src={src}
            alt={"画像"}
            width="0"
            height="0"
            sizes="100vw"
            className="object-contain w-full h-96 bg-black"
          />
          {caption && <figcaption>{caption}</figcaption>}
        </figure>
      );
    case "divider":
      return <Divider block={block} />;
    case "quote":
      return <Quote block={block} />;
    case "code":
      return <Code block={block} />;
    case "file":
      return <File block={block} />;
    case "bookmark":
      const href = block[type].url;
      return (
        <a href={href} target="_brank" className={styles.bookmark}>
          {href}
        </a>
      );
    case "table": {
      return (
        <table className={styles.table}>
          <tbody>
            {block.children?.map((child: any, i: number) => {
              const RowElement =
                block[type].has_column_header && i == 0 ? "th" : "td";
              return (
                <tr key={child.id}>
                  {child.table_row?.cells?.map((cell: any, i: number) => {
                    return (
                      <RowElement key={`${cell.plain_text}-${i}`}>
                        <Text text={cell} />
                      </RowElement>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      );
    }
    case "column_list": {
      return (
        <div className={styles.row}>
          {block.children.map((block: any) => RenderBlock(block))}
        </div>
      );
    }
    case "column": {
      return (
        <div>{block.children.map((child: any) => RenderBlock(child))}</div>
      );
    }
    default:
      return `❌ Unsupported block (${
        type === "unsupported" ? "unsupported by Notion API" : type
      })`;
  }
};

export default RenderBlock;

const renderNestedList = (block: any) => {
  const { type } = block;

  if (!block[type]) return null;

  const isNumberedList = block.children[0].type === "numbered_list";

  if (isNumberedList) {
    return (
      <ol className="list-decimal ml-6">
        {block.children.map((block: any) => RenderBlock(block))}
      </ol>
    );
  }
  return (
    <ul className="list-disc ml-6">
      {block.children.map((block: any) => RenderBlock(block))}
    </ul>
  );
};
