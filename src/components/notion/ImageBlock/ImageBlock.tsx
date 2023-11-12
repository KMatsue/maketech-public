import React, { FC } from "react";

import type { ImageBlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import Image from "next/image";

type Props = {
  block: ImageBlockObjectResponse;
};

const ImageBlock: FC<Props> = ({ block }) => {
  const src =
    block.image.type === "external"
      ? block.image.external.url
      : block.image.file.url;
  const caption = block.image.caption ? block.image.caption[0]?.plain_text : "";
  return (
    <figure>
      <Image
        src={src}
        alt={"画像"}
        width="0"
        height="0"
        sizes="100vw"
        className="object-contain w-full h-96 my-2"
      />
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  );
};

export default ImageBlock;
