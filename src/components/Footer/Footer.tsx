import Link from "next/link";
import React from "react";
import { RssIcon } from "@heroicons/react/24/solid"; // heroiconsをインポート

const Footer = () => {
  return (
    <footer className="w-full bg-gray-100 dark:bg-gray-900 mt-16 py-8">
      <div className="container mx-auto px-4 md:px-8 lg:px-16">
        <div className="flex flex-col items-center justify-center">
          <nav className="flex flex-wrap justify-center space-x-6 mb-4">
            <Link
              href="/privacy-policy"
              className="text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
            >
              プライバシーポリシー
            </Link>
            <Link
              href="/contact"
              className="text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
            >
              お問い合わせ
            </Link>
            <Link
              href="/"
              className="text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
            >
              トップに戻る
            </Link>
            {/* 他のフッターリンクがあればここに追加 */}
          </nav>
          <div className="flex items-center justify-center mb-4">
            <p className="mr-3 text-gray-600 dark:text-gray-400">
              Copyright &copy;
              <Link href="/" className="mx-1 hover:underline">
                MaKe TECH
              </Link>{" "}
              2023 - {new Date().getFullYear()}
            </p>
            <a
              href="/api/feed"
              className="text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200 transition-colors duration-200"
              title="RSS Feed"
              aria-label="RSS Feed"
              rel="alternate"
              type="application/rss+xml"
            >
              <RssIcon className="h-6 w-6 -mt-0.5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
