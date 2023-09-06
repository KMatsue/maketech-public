import Link from "next/link";
import React from "react";

const Post = () => {
  return (
    <section className="container lg:px-2 px-5 h-screen lg:w-2/5 mx-auto mt-20">
      <h2 className="w-full text-2xl font-medium">ここに記事のタイトル</h2>
      <div className="border-b-2 w-1/3 mt-1 border-sky-900"></div>
      <span className="text-gray-500">Posted date at date</span>
      <br />

      <p className="text-white bg-sky-900 rounded-xl font-medium mt-2 px-2 inline-block mr-2">
        <Link href={`/posts/tag/page/1`}>タグ</Link>
      </p>

      <div className="mt-10 font-medium">
        <Link href="/">
          <span className="pb-20 block mt-3 text-sky-900">←ホームに戻る</span>
        </Link>
      </div>
    </section>
  );
};

export default Post;
