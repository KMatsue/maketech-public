import Link from "next/link";
import React from "react";
import clsx from "clsx";

interface Props {
  numberOfPage: number;
  currentPage: string;
  tag: string;
}

const Pagination = (props: Props) => {
  const { numberOfPage, currentPage, tag } = props;

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
            <li
              className={clsx(
                "border-pagination-border rounded-lg w-8 h-8 relative hover:bg-pagination-hover-bg transition-colors duration-200",
                {
                  "border-2 font-semibold text-pagination-active-text":
                    Number(currentPage) === page,
                  "text-pagination-inactive-text":
                    Number(currentPage) !== page,
                }
              )}
            >
              <span className="absolute top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4">
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
