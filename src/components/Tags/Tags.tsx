import Link from "next/link";
import React from "react";

type Props = {
  tags: string[];
};

const Tags: React.FC<Props> = ({ tags }) => {
  console.log(tags);
  return (
    <div className="">
      {/* <section className="mb-8 mx-auto bg-orange-200 rounded-md p-5 shadow-2xl hover:shadow-none hover:translate-y-0.5 translate-all duration-300"> */}
      <section className="border border-r rounded-lg border-border-primary mb-8 mx-auto p-5">
        {/* <div className="font-medium mb-4">タグ検索</div> */}
        <div className="flex flex-wrap gap-3">
          {tags.map((tag: string, index: number) => (
            <Link href={`/posts/tag/${tag}/page/1`} key={index}>
              <span
                className="border border-tag-border bg-tag-bg text-tag-text cursor-pointer px-2 py-0.5 font-medium rounded-xl inline-block
               transition-colors duration-300 ease-in-out hover:bg-tag-hover-bg"
              >
                {tag}
              </span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Tags;
