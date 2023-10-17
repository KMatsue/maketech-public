import type { BookmarkBlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";

import type { OgpData } from "@/types/ogpData";

import ogpParser from "ogp-parser";
import { BlockObject } from "@/types/notion";

/**
 * OGPを取得する
 * @param url
 * @returns
 */
export const getOgp = async (url: string): Promise<OgpData> => {
  try {
    const encodeURL = encodeURI(url);
    const { title, ogp } = await ogpParser(encodeURL);
    console.log(`title:${title}`);
    console.log(ogp);

    return {
      pageUrl: encodeURL,
      title: title,
      description:
        ogp["og:description"]?.length > 0 ? ogp["og:description"][0] : "",
      ogImgUrl: ogp["og:image"].length > 0 ? ogp["og:image"][0] : "",
      faviconUrl: `https://www.google.com/s2/favicons?domain=${encodeURL}`,
    };
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("OPGの取得に失敗しました", url);

    return {
      pageUrl: url,
      title: "OGPデータが取得できません",
      description: "",
      ogImgUrl: "",
      faviconUrl: `https://www.google.com/s2/favicons?domain=${encodeURI(url)}`,
    };
  }
};

/**
 * BlockObjectのBookmarkにOPG情報を追加する
 * @param blocks
 * @returns
 */
export const setOgp = async (blocks: BlockObject[]): Promise<BlockObject[]> => {
  const results = await Promise.all(
    blocks.map(async (block) => {
      if (block.type !== "bookmark") return block;

      const url = block.bookmark.url;
      const ogp = await getOgp(url);

      return {
        ...block,
        ogp,
      } as BookmarkBlockObjectResponse & { ogp: OgpData };
    })
  );

  return results;
};
