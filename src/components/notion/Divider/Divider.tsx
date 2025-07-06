import React, { FC } from "react";
import type { DividerBlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";

type Props = {
  block: DividerBlockObjectResponse;
};

const Divider: FC<Props> = ({ block }) => {
  return <hr className="my-3 w-full border-border-primary" />;
};

export default Divider;
