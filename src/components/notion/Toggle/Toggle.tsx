import React, { FC } from "react";
// import type {
//   ToggleBlockObjectResponse,
//   BlockObjectRequest,
// } from "@notionhq/client/build/src/api-endpoints";
import { Text } from "../Text";
import RenderBlock from "../RenderBlock";

type Props = {
  block: any;
};

const Toggle: FC<Props> = ({ block }) => {
  return (
    <details>
      <summary className="my-1 text-md font-normal text-foreground">
        <Text text={block.toggle.rich_text} />
      </summary>
      {block.has_children &&
        block.children.map((child: any) => (
          <div className="ml-6" key={child.id}>
            {RenderBlock(child)}
          </div>
        ))}
    </details>
  );
};

export default Toggle;
