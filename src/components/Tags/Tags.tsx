import Link from "next/link";
import React from "react";

type Props = {
  tags: string[];
};

function Tags(props: Props) {
  const { tags } = props;
  console.log(tags);
  return (
    <div className=" mx-2">
      {/* <section className="mb-8 mx-auto bg-orange-200 rounded-md p-5 shadow-2xl hover:shadow-none hover:translate-y-0.5 translate-all duration-300"> */}
      <section className="border border-r rounded-lg border-gray-500 mb-8 mx-auto  p-5 ">
        {/* <div className="font-medium mb-4">タグ検索</div> */}
        <div className="flex flex-wrap gap-3">
          {tags.map((tag: string, index: number) => (
            <Link href={`/posts/tag/${tag}/page/1`} key={index}>
              <span className="border cursor-pointer px-2 py-0.5 font-medium rounded-xl inline-block">
                {tag}
              </span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Tags;
