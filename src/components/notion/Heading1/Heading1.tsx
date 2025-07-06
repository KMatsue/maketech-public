import React, { FC } from "react";
import type { Heading1BlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import { Text } from "../Text";

type Props = {
  block: Heading1BlockObjectResponse;
};

const Heading1: FC<Props> = ({ block }) => {
  return (
    <h2 className="text-[1.75rem] font-semibold text-foreground border-b border-border-primary mb-3 break-words">
      <Text text={block.heading_1.rich_text} />
    </h2>
  );
};

export default Heading1;
