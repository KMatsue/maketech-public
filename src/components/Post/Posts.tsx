import React from "react";
import SinglePost from "@/components/Post/SinglePost";

import { Post } from "@/types/post";

const Posts = ({ posts }: { posts: Post[] }) => {
  return (
    <>
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

export default Posts;
