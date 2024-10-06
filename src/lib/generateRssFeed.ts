import { Feed } from "feed";
import { getAllPosts } from "./notionAPI";
import { Post } from "@/types/post";

export async function generateRssFeed() {
  const posts = await getAllPosts();
  const siteUrl = process.env.SITE_URL || "http://localhost:3000";
  const date = new Date();

  const author = {
    name: "MaKe",
    // email: "author@maketech.net",
    link: siteUrl,
  };

  const feed = new Feed({
    title: "MaKeTECH",
    description:
      "Web開発、プログラミング、技術に関する情報を提供するテックブログ",
    id: siteUrl,
    link: siteUrl,
    language: "ja",
    image: `${siteUrl}/logo.png`,
    favicon: `${siteUrl}/favicon.ico`,
    copyright: `All rights reserved ${date.getFullYear()}, MaKeTECH`,
    updated: date,
    generator: "Next.js using Feed for Node.js",
    feedLinks: {
      rss2: `${siteUrl}/rss/feed.xml`,
      json: `${siteUrl}/rss/feed.json`,
      atom: `${siteUrl}/rss/atom.xml`,
    },
    author,
  });

  posts.forEach((post: Post) => {
    const url = `${siteUrl}/posts/${post.slug}`;
    feed.addItem({
      title: post.title,
      id: url,
      link: url,
      description: post.description,
      content: post.description,
      author: [author],
      contributor: [author],
      date: new Date(post.date),
    });
  });

  return feed;
}
