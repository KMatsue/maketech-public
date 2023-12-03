import React from "react";
import SinglePost from "@/components/Post/SinglePost";

import { Post } from "@/types/post";

const RecentPosts = ({ posts }: { posts: Post[] }) => {
  return (
    <>
      <h2 className="border-b-2 border-gray-500 mb-4">Recent Posts</h2>
      {posts.map((post: Post, index: number) => (
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
    </>
  );
};

export default RecentPosts;
