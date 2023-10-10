import React, { FC } from "react";
import type { BookmarkBlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import { OgpData } from "@/types/ogpData";

type Props = {
  block: BookmarkBlockObjectResponse & { ogp?: OgpData };
};

const Bookmark: FC<Props> = ({ block }) => {
  // const href = block.bookmark.url;
  // return (
  //   <a href={href} target="_brank" className="block mb-2">
  //     {href}
  //   </a>
  // );
  const ogp = block.ogp ?? {
    pageUrl: block.bookmark.url,
    title: "",
    description: "",
    ogImgUrl: "",
    faviconUrl: "",
  };
  // console.log(block.ogp);
  return (
    <a
      className="my-6 flex min-h-[120px] cursor-pointer justify-between rounded-lg border border-solid border-slate-400 bg-slate-50 hover:bg-slate-100 sp:flex-col"
      href={ogp.pageUrl}
      target="_blank"
      rel="noopener noreferrer"
    >
      <div className="flex max-w-[400px] flex-col justify-center gap-2 overflow-hidden px-6 py-3 sp:py-2 sp:px-4">
        <div className="font-bold text-slate-800 line-clamp-2 sp:text-sm">
          {ogp.title}
        </div>
        <div className="space-y-3 text-sm text-slate-600 line-clamp-2 sp:text-xs">
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
            className="h-full max-w-[240px] rounded-r-lg object-cover sp:max-w-full sp:rounded-b-lg sp:rounded-t-none"
            alt="bookmark ogp image"
          />
        ) : (
          <div className="h-full w-[240px] rounded-l-none rounded-r-lg sp:max-w-full sp:rounded-b-lg sp:rounded-t-none"></div>
        )}
      </div>
    </a>
  );
};

export default Bookmark;
