import React, { FC } from "react";
import type { ToDoBlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import { Text } from "../Text";

type Props = {
  block: ToDoBlockObjectResponse;
};

const ToDo: FC<Props> = ({ block }) => {
  return (
    <div>
      <label htmlFor={block.id} className="text-foreground">
        <input
          type="checkbox"
          id={block.id}
          defaultChecked={block.to_do.checked}
        />{" "}
        <Text text={block.to_do.rich_text} />
      </label>
    </div>
  );
};

export default ToDo;
