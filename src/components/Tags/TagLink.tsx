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
      className="text-tag-text bg-tag-bg rounded-xl px-2 py-0.5 hover:bg-tag-hover-bg transition-all duration-300 z-10 relative"
    >
      {tag}
    </span>
  </Link>
);

export default TagLink;
