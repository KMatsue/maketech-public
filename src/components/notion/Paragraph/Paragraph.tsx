import React, { FC } from "react";
import type { ParagraphBlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import { Text } from "../Text";

type Props = {
  block: ParagraphBlockObjectResponse;
};

const Paragraph: FC<Props> = ({ block }) => {
  return (
    <p className="mb-4 text-md font-normal text-gray-800 dark:text-gray-400">
      <Text text={block.paragraph.rich_text} />
    </p>
  );
};

export default Paragraph;
