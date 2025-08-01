import React, { FC } from "react";
import type { Heading2BlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import { Text } from "../Text";

type Props = {
  block: Heading2BlockObjectResponse;
};

const Heading2: FC<Props> = ({ block }) => {
  return (
    <h3 className="text-[1.5rem] font-semibold text-foreground border-b border-border-primary mt-4 mb-2 break-words">
      <Text text={block.heading_2.rich_text} />
    </h3>
  );
};

export default Heading2;
