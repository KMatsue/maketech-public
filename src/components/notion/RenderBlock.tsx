import React from "react";
import styles from "@/app/posts/[slug]/post.module.css";
import { Quote } from "./Quote/Quote";
import Heading1 from "./Heading1/Heading1";
import Heading3 from "./Heading3/Heading3";
import Heading2 from "./Heading2/Heading2";
import Code from "./Code/Code";
import Paragraph from "./Paragraph/Paragraph";
import Divider from "./Divider/Divider";
import ToDo from "./ToDo/ToDo";
import File from "./File/File";
import Callout from "./Callout/Callout";
import Toggle from "./Toggle/Toggle";
import NumberedList from "./NumberedList/NumberedList";
import BulletedList from "./BulletedList/Bulleted";
import ListItem from "./ListItem/ListItem";
import Table from "./Table/Tabale";
import ImageBlock from "./ImageBlock/ImageBlock";
import Bookmark from "./Bookmark/Bookmark";

const RenderBlock = (block: any) => {
  const { type } = block;

  switch (type) {
    case "paragraph":
      return <Paragraph block={block} key={block.id} />;
    case "heading_1":
      return <Heading1 block={block} key={block.id} />;
    case "heading_2":
      return <Heading2 block={block} key={block.id} />;
    case "heading_3":
      return <Heading3 block={block} key={block.id} />;
    case "bulleted_list":
      return <BulletedList block={block} key={block.id} />;
    case "numbered_list":
      return <NumberedList block={block} key={block.id} />;
    case "bulleted_list_item":
    case "numbered_list_item":
      return <ListItem block={block} key={block.id} />;
    case "callout":
      return <Callout block={block} key={block.id} />;
    case "to_do":
      return <ToDo block={block} key={block.id} />;
    case "toggle":
      return <Toggle block={block} key={block.id} />;
    case "image":
      return <ImageBlock block={block} key={block.id} />;
    case "divider":
      return <Divider block={block} key={block.id} />;
    case "quote":
      return <Quote block={block} key={block.id} />;
    case "code":
      return <Code block={block} key={block.id} />;
    case "file":
      return <File block={block} key={block.id} />;
    case "bookmark":
      return <Bookmark block={block} key={block.id} />;
    case "table":
      return <Table block={block} key={block.id} />;
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
    case "child_page":
      return (
        <div className={styles.childPage}>
          <strong>{block[type].title}</strong>
          {block.children.map((child: any) => RenderBlock(child))}
        </div>
      );
    default:
      return `❌ Unsupported block (${
        type === "unsupported" ? "unsupported by Notion API" : type
      })`;
  }
};

export default RenderBlock;
