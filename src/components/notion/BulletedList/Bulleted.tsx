import React, { FC } from "react";
import type { BulletedListItemBlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import RenderBlock from "../RenderBlock";

type Props = {
  block: {
    id: string;
    type: string;
    bulleted_list: { children: BulletedListItemBlockObjectResponse[] };
  };
};

const BulletedList: FC<Props> = ({ block }) => {
  return (
    <ul className="list-disc max-w-lg space-y-1 list-inside text-slate-800 dark:text-slate-100">
      {block.bulleted_list.children.map(
        (child: BulletedListItemBlockObjectResponse) => RenderBlock(child)
      )}
    </ul>
  );
};

export default BulletedList;
