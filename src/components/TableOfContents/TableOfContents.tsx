"use client";
import React, { useEffect } from "react";
import tocbot from "tocbot";

const TableOfContents = () => {
  useEffect(() => {
    tocbot.init({
      // Where to render the table of contents.
      tocSelector: ".toc",
      // Where to grab the headings to build the table of contents.
      contentSelector: ".post",
      // Which headings to grab inside of the contentSelector element.
      headingSelector: "h2, h3",
      // For headings inside relative or absolute positioned containers within content.
      hasInnerContainers: true,
    });
    return () => tocbot.destroy();
    // destroy関数を使用し、不要となったtocbotインスタンスを削除します
  }, []);

  return (
    <div className="p-4 m-2 border-2">
      <h3 className="text-center p-2 mb-1 font-semibold border-b">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="inline text-teal-400 ai ai-Book"
        >
          <path d="M2 6s1.5-2 5-2 5 2 5 2v14s-1.5-1-5-1-5 1-5 1V6z" />
          <path d="M12 6s1.5-2 5-2 5 2 5 2v14s-1.5-1-5-1-5 1-5 1V6z" />
        </svg>
        この記事の目次
      </h3>
      <div className="toc mt-1 mb-1"></div>
      <style jsx global>{`
        .toc {
          border-radius: 0.25rem;
          padding: 1rem;
          font-size: 1rem;
        }

        .toc-list .toc-list {
          padding-left: 1rem;
          padding-top: 0.5rem;
        }

        .toc-list-item {
          padding-bottom: 0.5rem;
        }

        .toc-list-item:last-child {
          padding-bottom: 0;
        }

        .toc-link {
          color: rgba(156, 163, 175, 0.7);
        }

        .is-active-link {
          color: #282828;
          font-weight: 700;
        }
      `}</style>
    </div>
  );
};

export default TableOfContents;
