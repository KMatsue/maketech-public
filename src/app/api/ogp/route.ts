import type { NextApiRequest, NextApiResponse } from "next";
import type { OgpData } from "@/types/ogpData";

import { getOgp } from "@/lib/ogp";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<OgpData>
) {
  const { url } = req.query as { url: string };

  const ogp = await getOgp(url);

  res.status(200).json(ogp);
}
