import { NextResponse } from "next/server";
import { getBlockById } from "@/lib/notionAPI";
import type { ImageBlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const blockId = searchParams.get("blockId");

  if (!blockId) {
    return NextResponse.json(
      { error: "Block ID is required" },
      { status: 400 }
    );
  }

  try {
    const block = (await getBlockById(blockId)) as ImageBlockObjectResponse;
    if (block.type === "image" && "file" in block.image) {
      return NextResponse.json({ url: block.image.file.url });
    }
    return NextResponse.json({ error: "Invalid block type" }, { status: 400 });
  } catch (error) {
    console.error("Error fetching image URL:", {
      message: error instanceof Error ? error.message : "Unknown error",
      blockId,
    });
    return NextResponse.json(
      { error: "Failed to fetch image URL" },
      { status: 500 }
    );
  }
}
