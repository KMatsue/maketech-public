"use client";

import React, { FC } from "react";
import type { ImageBlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import Image from "next/image";
import useSWR from "swr";

type ApiResponse = {
  url: string;
  error?: string;
};

type Props = {
  block: ImageBlockObjectResponse;
};

const fetcher = (url: string) =>
  fetch(url).then((res) => res.json()) as Promise<ApiResponse>;

const ImageBlock: FC<Props> = ({ block }) => {
  const initialUrl =
    block.image.type === "external"
      ? block.image.external.url
      : block.image.file.url;

  const { data, error } = useSWR(
    block.image.type === "file" ? `/api/image-url?blockId=${block.id}` : null,
    fetcher,
    {
      refreshInterval: 3000000, // 50分ごとに更新
      dedupingInterval: 60000, // 1分間は重複リクエストを防ぐ
      fallbackData: { url: initialUrl },
      revalidateOnFocus: false,
    }
  );

  if (error) {
    console.error("Failed to fetch image URL:", error);
  }

  const imageUrl = data?.url || initialUrl;
  const caption = block.image.caption ? block.image.caption[0]?.plain_text : "";

  return (
    <figure className="my-4">
      <div className="relative w-full aspect-w-16 aspect-h-9">
        <Image
          src={imageUrl}
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
        <figcaption className="text-center text-sm text-muted-foreground mt-2">
          {caption}
        </figcaption>
      )}
    </figure>
  );
};

export default ImageBlock;
