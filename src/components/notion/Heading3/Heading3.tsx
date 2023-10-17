import React, { FC } from "react";
import type { Heading3BlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import { Text } from "../Text";

type Props = {
  block: Heading3BlockObjectResponse;
};

const Heading3: FC<Props> = ({ block }) => {
  return (
    <h3 className="text-xl font-bold">
      <Text text={block.heading_3.rich_text} />
    </h3>
  );
};

export default Heading3;
