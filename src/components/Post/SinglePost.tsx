import Link from "next/link";

import React from "react";
import TagLink from "../Tags/TagLink";

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
    <article className="group relative border border-gray-500 mb-7 mx-auto rounded-lg p-5 cursor-pointer transition-all duration-300 hover:shadow-lg hover:bg-gray-100 dark:hover:bg-gray-800">
      <Link
        href={`/posts/${slug}`}
        className="absolute inset-0 z-0"
        aria-label={`Read more about ${title}`}
      >
        <span className="sr-only">Read more</span>
      </Link>
      <h2 className="text-gray-600 dark:text-white text-xl font-medium mb-2">
        {title}
      </h2>
      <div className={`text-gray-400} mb-2`}>{date}</div>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag, index) => (
          <TagLink key={index} tag={tag} />
        ))}
      </div>
    </article>
  );
};

export default SinglePost;
