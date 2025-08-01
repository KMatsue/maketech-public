import React, { FC } from "react";
import type { Heading3BlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import { Text } from "../Text";

type Props = {
  block: Heading3BlockObjectResponse;
};

const Heading3: FC<Props> = ({ block }) => {
  return (
    <h4 className="text-[1.4rem] font-bold text-foreground mt-2 mb-2 break-words">
      <Text text={block.heading_3.rich_text} />
    </h4>
  );
};

export default Heading3;
