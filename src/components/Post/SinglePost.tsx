import Link from "next/link";
import { type } from "os";

import React from "react";

type Props = {
  title: string;
  description: string;
  date: string;
  tags: string[];
  slug: string;
  isPaginationPage: boolean;
};

const SinglePost = (props: Props) => {
  const { title, description, date, tags, slug, isPaginationPage } = props;

  return (
    <>
      {isPaginationPage ? (
        <section className="border border-gray-500 mb-7 mx-auto rounded-lg p-5">
          <div className="lg:flex items-center gap-3">
            <h2 className="text-gray-600 lg:text-2xl font-medium mb-2 hover:underline">
              <Link href={`/posts/${slug}`}>{title}</Link>
            </h2>
          </div>

          <div className="text-gray-400 mb-2">{date}</div>
          <div className=" flex flex-wrap gap-2">
            {tags.map((tag: string, index: number) => (
              <Link href={`/posts/tag/${tag}/page/1`} key={index}>
                <span
                  key={index}
                  className="text-white bg-gray-500 rounded-xl px-2 py-0.5 hover:bg-opacity-70  translate-all duration-300"
                >
                  {tag}
                </span>
              </Link>
            ))}
          </div>

          {/* <p className=" text-gray-100">{description}</p> */}
        </section>
      ) : (
        // <section className=" border-2 mb-8 mx-auto rounded-lg p-5 shadow-2xl hover:shadow-none hover:translate-y-0.5 translate-all duration-300">
        <section className=" border border-gray-500 mb-7 mx-auto rounded-lg p-5 ">
          <div className="flex items-center gap-3">
            <h2 className="text-gray-600 lg:text-2xl font-medium mb-2 hover:underline">
              <Link href={`/posts/${slug}`}>{title}</Link>
            </h2>
          </div>
          <div className="text-gray-500 mb-2">{date}</div>
          <div className=" flex flex-wrap gap-2">
            {tags.map((tag: string, index: number) => (
              <Link href={`/posts/tag/${tag}/page/1`} key={index}>
                {/* <span key={index} className="text-white bg-gray-500 rounded-xl px-2 hover:px-4 hover:py-1 translate-all duration-300"> */}
                <span
                  key={index}
                  className="text-white bg-gray-500 rounded-xl px-2 py-0.5 hover:bg-opacity-70  translate-all duration-300"
                >
                  {tag}
                </span>
              </Link>
            ))}
          </div>

          {/* <p className=" text-gray-100">{description}</p> */}
        </section>
      )}
    </>
  );
};

export default SinglePost;
