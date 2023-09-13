import Link from "next/link";
import React from "react";

interface Props {
  numberOfPage: number;
  tag: string;
}

const Pagination = (props: Props) => {
  const { numberOfPage, tag } = props;
  // console.log(tag);

  let pages: number[] = [];
  for (let i = 1; i <= numberOfPage; i++) {
    pages.push(i);
  }

  return (
    <section className="mb-8 lg:w-1/2 mx-auto rounded-md p-5">
      <ul className="flex items-center justify-center gap-4">
        {pages.map((page) => (
          <Link
            href={
              tag ? `/posts/tag/${tag}/page/${page}` : `/posts/page/${page}`
            }
            key={page}
          >
            <li className="border border-gray-500 rounded-lg w-8 h-8 relative hover:p-4">
              <span className="absolute top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4 text-gray-500">
                {page}
              </span>
            </li>
          </Link>
        ))}
      </ul>
    </section>
  );
};

export default Pagination;
