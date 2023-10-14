import React, { FC } from "react";
import type {
  BulletedListItemBlockObjectResponse,
  NumberedListItemBlockObjectResponse,
} from "@notionhq/client/build/src/api-endpoints";
import RenderBlock from "../RenderBlock";
import { Text } from "../Text";

type Props = {
  block:
    | BulletedListItemBlockObjectResponse
    | NumberedListItemBlockObjectResponse;
};

const ListItem: FC<Props> = ({ block }) => {
  if (block.type == "bulleted_list_item") {
    return (
      <li key={block.id}>
        <Text text={block.bulleted_list_item.rich_text} />
        {!!block.has_children && renderNestedList(block)}
      </li>
    );
  } else {
    return (
      <li key={block.id}>
        <Text text={block.numbered_list_item.rich_text} />
        {!!block.has_children && renderNestedList(block)}
      </li>
    );
  }
};

export default ListItem;

const renderNestedList = (block: any) => {
  const { type } = block;

  if (!block[type]) return null;

  const isNumberedList = block.children[0].type === "numbered_list";

  if (isNumberedList) {
    return (
      <ol className="list-decimal ml-6" key={block.id}>
        {block.children.map((block: any) => RenderBlock(block))}
      </ol>
    );
  }
  return (
    <ul className="list-disc ml-6" key={block.id}>
      {block.children.map((block: any) => RenderBlock(block))}
    </ul>
  );
};
