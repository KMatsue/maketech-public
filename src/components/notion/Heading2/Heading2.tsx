import React, { FC } from "react";
import type { Heading2BlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import { Text } from "../Text";

type Props = {
  block: Heading2BlockObjectResponse;
};

const Heading2: FC<Props> = ({ block }) => {
  return (
    <h2>
      <Text text={block.heading_2.rich_text} />
    </h2>
  );
};

export default Heading2;
