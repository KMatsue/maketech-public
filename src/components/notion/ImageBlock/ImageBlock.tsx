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
    <figure className="my-4">
      <div className="relative w-full aspect-w-16 aspect-h-9">
        <Image
          src={src}
          alt={caption || "画像"}
          fill
          style={{ objectFit: "contain" }}
          sizes="(min-width: 1024px) 80vw, 100vw"
          className="rounded-lg"
          placeholder="blur"
          blurDataURL="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'%3E%3Crect width='200' height='200' fill='%23e0e0e0'/%3E%3Ctext x='50%25' y='50%25' font-family='Arial' font-size='20' fill='%23757575' text-anchor='middle' dy='.3em'%3E画像%3C/text%3E%3C/svg%3E"
        />
      </div>
      {caption && (
        <figcaption className="text-center text-sm text-gray-600 dark:text-gray-400 mt-2">
          {caption}
        </figcaption>
      )}
    </figure>
  );
};

export default ImageBlock;
