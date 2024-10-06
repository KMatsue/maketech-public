import Link from "next/link";
import React from "react";
import { RssIcon } from "@heroicons/react/24/outline";

const Footer = () => {
  return (
    <footer className="w-full flex justify-center items-center py-4">
      <div className="flex items-center">
        <p className="mr-3">
          Copyright &copy;
          <Link href="/" className="mx-1 hover:underline">
            MaKe TECH
          </Link>{" "}
          2023 - 2024
        </p>
        <Link
          href="/api/feed"
          className="text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200 transition-colors duration-200"
          title="RSS Feed"
          aria-label="RSS Feed"
        >
          <RssIcon className="h-6 w-6 -mt-0.5" />
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
