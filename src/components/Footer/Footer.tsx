import Link from "next/link";
import React from "react";
import { RssIcon } from "@heroicons/react/24/solid"; // heroiconsをインポート

const Footer = () => {
  return (
    <footer className="w-full bg-footer-bg mt-16 py-8">
      <div className="container mx-auto px-4 md:px-8 lg:px-16">
        <div className="flex flex-col items-center justify-center">
          <nav className="flex flex-wrap justify-center space-x-6 mb-4">
            <Link
              href="/privacy-policy"
              className="text-footer-text hover:text-footer-text-hover"
            >
              プライバシーポリシー
            </Link>
            <Link
              href="/contact"
              className="text-footer-text hover:text-footer-text-hover"
            >
              お問い合わせ
            </Link>
            <Link
              href="/"
              className="text-footer-text hover:text-footer-text-hover"
            >
              トップに戻る
            </Link>
            {/* 他のフッターリンクがあればここに追加 */}
          </nav>
          <div className="flex items-center justify-center mb-4">
            <p className="mr-3 text-footer-text">
              Copyright &copy;
              <Link href="/" className="mx-1 hover:underline text-footer-text hover:text-footer-text-hover">
                MaKe TECH
              </Link>{" "}
              2023 - {new Date().getFullYear()}
            </p>
            <a
              href="/api/feed"
              className="text-footer-text hover:text-footer-text-hover transition-colors duration-200"
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
