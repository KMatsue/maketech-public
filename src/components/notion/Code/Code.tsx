import React, { FC } from "react";
import type { CodeBlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import { blockToMarkdown } from "@/lib/notionAPI";
import MarkdownField from "@/components/MarkdownField";
type Props = {
  block: CodeBlockObjectResponse;
};

const Code: FC<Props> = async ({ block }) => {
  const value = await blockToMarkdown(block);
  // console.log(`code:${value}`);
  // console.log(`code:${JSON.stringify(block)}`);
  return (
    <MarkdownField mdString={value}></MarkdownField>

    // <pre className={styles.pre}>
    //   <code className={styles.code_block}>
    //     {block.code.rich_text[0].plain_text}
    //   </code>
    // </pre>
    // <div>
    //  </div>
  );
};

export default Code;
