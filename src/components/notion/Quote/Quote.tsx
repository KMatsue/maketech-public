import type { QuoteBlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import type { FC } from "react";

type Props = {
  block: QuoteBlockObjectResponse;
};

export const Quote: FC<Props> = ({ block }) => {
  return (
    <blockquote className='relative rounded bg-muted px-6 py-2 text-muted-foreground sp:text-base before:absolute before:top-1/2 before:left-1 before:h-[85%] before:w-1 before:-translate-y-1/2 before:rounded-full before:bg-border-primary before:content-[""]'>
      {block.quote.rich_text[0].plain_text}
    </blockquote>
  );
};
