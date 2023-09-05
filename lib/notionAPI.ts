import { Client } from "@notionhq/client";

const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

export const getAllPosts = async () => {
  const posts = await notion.databases.query({
    database_id: process.env.NOTION_DATABASE_ID || "",
    page_size: 100,
  });

  const allPosts = posts.results;
  //   return allPosts;
  return allPosts.map((post) => {
    return getPageMetaData(post);
  });
};

/*

*/
const getPageMetaData = (post) => {
  return {
    id: post.id,
    title: post.properties.name.title[0].plain_text,
    description: post.properties.description.rich_text[0].plain_text,
    date: post.properties.date.date.start,
    slug: post.properties.slug.rich_text[0].plain_text,
  };
};
