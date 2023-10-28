import type { QuoteBlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import type { FC } from "react";

type Props = {
  block: QuoteBlockObjectResponse;
};

export const Quote: FC<Props> = ({ block }) => {
  return (
    <blockquote className='relative rounded bg-slate-50 dark:bg-slate-600 px-6 py-2 text-slate-600  dark:text-slate-200 sp:text-base before:absolute before:top-1/2 before:left-1 before:h-[85%] before:w-1 before:-translate-y-1/2 before:rounded-full before:bg-slate-500 dark:before:bg-slate-200 before:content-[""]'>
      {block.quote.rich_text[0].plain_text}
    </blockquote>
  );
};
