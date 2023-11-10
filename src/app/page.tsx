import { getAllTags, getPostsForTopPage } from "@/lib/notionAPI";
import SinglePost from "@/components/Post/SinglePost";
import Link from "next/link";
import Tag from "@/components/Tags/Tags";
import { Post } from "@/types/post";

const Home = async () => {
  const tenPosts = await getPostsForTopPage(5);
  const allTags = await getAllTags();

  return (
    <main className="container mx-auto w-full mt-14 md:flex">
      <div className="mx-auto lg:w-9/12">
        <h2 className="border-b-2 border-gray-500 mb-4">Recent Posts</h2>
        {tenPosts.map((post: Post, index: number) => (
          <div key={index} className="">
            <SinglePost
              title={post.title}
              description={post.description}
              date={post.date}
              tags={post.tags}
              slug={post.slug}
              isPaginationPage={false}
            />
          </div>
        ))}
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
