import React from "react";
import { Text } from "@/components/notion/Text";
import styles from "@/app/posts/[slug]/post.module.css";
import Image from "next/image";
import Link from "next/link";
import { Quote } from "./Quote/Quote";
import Heading1 from "./Heading1/Heading1";
import Heading3 from "./Heading3/Heading3";
import Heading2 from "./Heading2/Heading2";
import Code from "./Code/Code";

const renderBlock = (block: any) => {
  const { type, id } = block;

  switch (type) {
    case "paragraph":
      return (
        <p>
          <Text text={block[type].rich_text} />
        </p>
      );
    case "heading_1":
      return <Heading1 block={block} />;
    case "heading_2":
      return <Heading2 block={block} />;
    case "heading_3":
      return <Heading3 block={block} />;

    case "bulleted_list": {
      return (
        <ul>{block[type].children.map((child: any) => renderBlock(child))}</ul>
      );
    }
    case "numbered_list": {
      return (
        <ol>{block[type].children.map((child: any) => renderBlock(child))}</ol>
      );
    }
    case "bulleted_list_item":
    case "numbered_list_item":
      return (
        <li key={block.id}>
          <Text text={block[type].rich_text} />
          {!!block[type].children && renderNestedList(block)}
        </li>
      );
    case "to_do":
      return (
        <div>
          <label htmlFor={id}>
            <input
              type="checkbox"
              id={id}
              defaultChecked={block[type].checked}
            />{" "}
            <Text text={block[type].rich_text} />
          </label>
        </div>
      );
    case "toggle":
      return (
        <details>
          <summary>
            <Text text={block[type].rich_text} />
          </summary>
          {block.children?.map((child: any) => (
            <div key={child.id}>{renderBlock(child)}</div>
          ))}
        </details>
      );
    case "child_page":
      return (
        <div className={styles.childPage}>
          <strong>{block[type].title}</strong>
          {block.children.map((child: any) => renderBlock(child))}
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
      return <hr key={id} />;
    case "quote":
      return <Quote block={block} />;
    // <blockquote key={id}>{value.rich_text[0].plain_text}</blockquote>;
    case "code":
      return <Code block={block} />;
    case "file":
      const src_file =
        block[type].type === "external"
          ? block[type].external.url
          : block[type].file.url;
      const splitSourceArray = src_file.split("/");
      const lastElementInArray = splitSourceArray[splitSourceArray.length - 1];
      const caption_file = block[type].caption
        ? block[type].caption[0]?.plain_text
        : "";
      return (
        <figure>
          <div className={styles.file}>
            <Link href={src_file} passHref>
              {lastElementInArray.split("?")[0]}
            </Link>
          </div>
          {caption_file && <figcaption>{caption_file}</figcaption>}
        </figure>
      );
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
          {block.children.map((block: any) => renderBlock(block))}
        </div>
      );
    }
    case "column": {
      return (
        <div>{block.children.map((child: any) => renderBlock(child))}</div>
      );
    }
    default:
      return `❌ Unsupported block (${
        type === "unsupported" ? "unsupported by Notion API" : type
      })`;
  }
};

export default renderBlock;

const renderNestedList = (block: any) => {
  const { type } = block;
  // const value = block[type];
  if (!block[type]) return null;

  const isNumberedList = block[type].children[0].type === "numbered_list_item";

  if (isNumberedList) {
    return (
      <ol>{block[type].children.map((block: any) => renderBlock(block))}</ol>
    );
  }
  return (
    <ul>{block[type].children.map((block: any) => renderBlock(block))}</ul>
  );
};
