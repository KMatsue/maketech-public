import React, { FC } from "react";
import type { Heading3BlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import { Text } from "../Text";

type Props = {
  block: Heading3BlockObjectResponse;
};

const Heading3: FC<Props> = ({ block }) => {
  return (
    <h3 className="text-[1.5rem] font-bold text-slate-800 dark:text-slate-100 mb-1">
      <Text text={block.heading_3.rich_text} />
    </h3>
  );
};

export default Heading3;
