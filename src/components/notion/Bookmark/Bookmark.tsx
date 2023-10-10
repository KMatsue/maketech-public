import React, { FC } from "react";
import type { BookmarkBlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import { OgpData } from "@/types/ogpData";

type Props = {
  block: BookmarkBlockObjectResponse & { ogp?: OgpData };
};

const Bookmark: FC<Props> = ({ block }) => {
  const ogp = block.ogp ?? {
    pageUrl: block.bookmark.url,
    title: "",
    description: "",
    ogImgUrl: "",
    faviconUrl: "",
  };

  return (
    <a
      className="my-6 flex flex-col min-h-[120px] cursor-pointer justify-between rounded-md border border-solid border-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 sm:flex-row"
      href={ogp.pageUrl}
      target="_blank"
      rel="noopener noreferrer"
    >
      <div className="flex max-w-[400px] flex-col justify-center gap-2 overflow-hidden py-2 px-4 sm:px-6 sm:py-3">
        <div className=" text-slate-800 dark:text-slate-100 line-clamp-2">
          {ogp.title}
        </div>
        <div className="space-y-3 text-xs text-slate-600 dark:text-slate-200 line-clamp-2 sm:text-sm">
          {ogp.description}
        </div>
        <div className="flex items-center gap-2">
          <img
            src={ogp.faviconUrl}
            className="h-4 w-4"
            alt="bookmark favicon image"
          />
          <div className="text-xs line-clamp-1">{ogp?.pageUrl}</div>
        </div>
      </div>
      <div className="flex items-end">
        {ogp.ogImgUrl ? (
          <img
            src={ogp.ogImgUrl}
            className="h-full sm:max-w-[240px] object-cover max-w-full rounded-b-md rounded-t-none  sm:rounded-r-md sm:rounded-l-none"
            alt="bookmark ogp image"
          />
        ) : (
          <div className="h-full sm:max-w-[240px] object-cover max-w-full rounded-b-md rounded-t-none  sm:rounded-r-md sm:rounded-l-none"></div>
        )}
      </div>
    </a>
  );
};

export default Bookmark;
