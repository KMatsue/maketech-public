import React, { FC } from "react";
import type { NumberedListItemBlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import RenderBlock from "../RenderBlock";

type Props = {
  block: {
    id: string;
    type: string;
    numbered_list: { children: NumberedListItemBlockObjectResponse[] };
  };
};

const NumberedList: FC<Props> = ({ block }) => {
  return (
    <ol className="list-decimal max-w-2xl space-y-1 list-inside text-foreground">
      {block.numbered_list.children.map(
        (child: NumberedListItemBlockObjectResponse) => RenderBlock(child)
      )}
    </ol>
  );
};

export default NumberedList;
