import React, { FC } from "react";
import { useMemo } from "react";
import type { CalloutBlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import { Text } from "../Text";

type Props = {
  block: CalloutBlockObjectResponse;
};

const Callout: FC<Props> = ({ block }) => {
  const emoji = useMemo(() => {
    if (!!block.callout.icon && block.callout.icon.type === "emoji")
      return block.callout.icon.emoji;

    return "📣";
  }, [block.callout.icon]);
  return (
    <div className="flex items-center gap-3 rounded border border-solid border-slate-300 dark:border-slate-700 p-2 bg-slate-200 dark:bg-slate-600">
      <div className="flex h-8 w-8 items-center justify-center bg-slate-200 dark:bg-slate-600">
        {emoji}
      </div>
      <div className="sp:text-sm">
        <Text text={block.callout.rich_text} />
      </div>
    </div>
  );
};

export default Callout;
