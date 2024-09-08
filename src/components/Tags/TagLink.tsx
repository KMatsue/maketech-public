"use client";

import Link from "next/link";

import React from "react";

type TagLinkProps = {
  tag: string;
};

const TagLink: React.FC<TagLinkProps> = ({ tag }) => (
  <Link href={`/posts/tag/${tag}/page/1`} passHref>
    <span
      onClick={(e) => e.stopPropagation()}
      className="text-white bg-gray-500 rounded-xl px-2 py-0.5 hover:bg-opacity-70 transition-all duration-300 z-10 relative"
    >
      {tag}
    </span>
  </Link>
);

export default TagLink;
