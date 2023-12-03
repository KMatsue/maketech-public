import { getAllTags, getPostsTopPage } from "@/lib/notionAPI";
import Link from "next/link";
import Tag from "@/components/Tags/Tags";
import Posts from "@/components/Post/Posts";

const Home = async () => {
  const posts = await getPostsTopPage({ pageSize: 5 });
  const allTags = await getAllTags();

  return (
    <main className="container mx-auto w-full mt-14 ">
      <div className="mx-auto lg:w-9/12">
        <h2 className="border-b-2 border-gray-500 mb-4">Recent Posts</h2>
        <Posts posts={posts} />
        <h4>
          <Link
            href="/posts/page/1"
            className="mb-6  mx-auto px-5 block text-right"
          >
            ....もっと見る
          </Link>
        </h4>
      </div>
      {/* <div className="flex-1 md:flex-auto md:w-4/12 lg:w-3/12">
        <h2 className="border-b-2 border-gray-500 mb-4 ">Tags</h2>
        <Tag tags={allTags} />
      </div> */}
    </main>
  );
};
export default Home;
