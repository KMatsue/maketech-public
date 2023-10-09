import React, { FC } from "react";
import type { DividerBlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";

type Props = {
  block: DividerBlockObjectResponse;
};

const Divider: FC<Props> = ({ block }) => {
  return <hr key={block.id} />;
};

export default Divider;
