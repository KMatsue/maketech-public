import { NextResponse } from "next/server";
import { generateRssFeed } from "@/lib/generateRssFeed";

export async function GET() {
  try {
    const feed = await generateRssFeed();
    return new NextResponse(feed.rss2(), {
      status: 200,
      headers: {
        "Content-Type": "application/rss+xml; charset=utf-8",
      },
    });
  } catch (error) {
    console.error("Error generating feed:", error);
    return NextResponse.json(
      { error: "Error generating feed" },
      { status: 500 }
    );
  }
}
