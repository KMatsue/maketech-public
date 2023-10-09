import React, { FC } from "react";
import type { BookmarkBlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";

type Props = {
  block: BookmarkBlockObjectResponse;
};

const Bookmark: FC<Props> = ({ block }) => {
  const href = block.bookmark.url;
  return (
    <a href={href} target="_brank" className="block mb-2">
      {href}
    </a>
  );
};

export default Bookmark;
