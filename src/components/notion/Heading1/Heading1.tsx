import React, { FC } from "react";
import type { Heading1BlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import { Text } from "../Text";

type Props = {
  block: Heading1BlockObjectResponse;
};

const Heading1: FC<Props> = ({ block }) => {
  return (
    <h1 className="text-3xl font-bold">
      <Text text={block.heading_1.rich_text} />
    </h1>
  );
};

export default Heading1;
