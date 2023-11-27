import Link from "next/link";
import React from "react";

export const metadata = {
  title: "404 Not Found",
};

const NotFound = () => {
  return (
    <div className="text-center max-h-[100%] m-12">
      <h2 className="text-6xl">Not Found</h2>
      <p className="mt-4 mb-16">指定されたページは見つかりませんでした。</p>
      <Link
        href="/"
        className="text-3xl hover:text-4xl duration-150 underline cursor-pointer"
      >
        Homeへ戻る
      </Link>
    </div>
  );
};

export default NotFound;
