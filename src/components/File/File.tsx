import React, { FC } from "react";
import type { FileBlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import Link from "next/link";

type Props = {
  block: FileBlockObjectResponse;
};

const File: FC<Props> = ({ block }) => {
  const src_file =
    block.file.type === "external"
      ? block.file.external.url
      : block.file.file.url;
  const splitSourceArray = src_file.split("/");
  const lastElementInArray = splitSourceArray[splitSourceArray.length - 1];
  const caption_file = block.file.caption
    ? block.file.caption[0]?.plain_text
    : "";

  return (
    <figure>
      <div className="px-1 py-0.5 hover:cursor-pointer hover:rounded-sm hover:bg-stone-700">
        <Link href={src_file} passHref className=" text-inherit">
          {lastElementInArray.split("?")[0]}
        </Link>
      </div>
      {caption_file && <figcaption>{caption_file}</figcaption>}
    </figure>
  );
};

export default File;
