"use client";
import React, { useEffect } from "react";
import tocbot from "tocbot";

const TableOfContents = () => {
  const addIdsToTitle = () => {
    const entryContainer = document.querySelector(".post");
    if (!entryContainer) {
      return;
    }
    const headings = entryContainer.querySelectorAll("h2, h3, h4");
    [].forEach.call(headings, (heading: HTMLElement) => {
      const id = heading.textContent ?? "";
      if (!heading.getAttribute("id")) {
        heading.setAttribute("id", id);
      }
    });
  };

  const isHeadingsExists = () => {
    const entryContainer = document.querySelector(".post");
    if (!entryContainer) {
      console.log("!entryContainer");
      return;
    }
    const headings = entryContainer.querySelectorAll("h2, h3, h4");
    if (headings.length === 0) {
      return false;
    }
    return true;
  };

  useEffect(() => {
    addIdsToTitle();
    const item = document.querySelector(".toc") as HTMLElement;
    if (!item) {
      return;
    }
    if (!isHeadingsExists()) {
      return;
    }
    tocbot.init({
      // Where to render the table of contents.
      tocSelector: ".toc",
      // Where to grab the headings to build the table of contents.
      contentSelector: ".post",
      // Which headings to grab inside of the contentSelector element.
      headingSelector: "h2, h3, h4",
    });
    return () => tocbot.destroy();
  }, []);

  return (
    <div className="p-2">
      <h3 className="text-center p-2 mb-1 text-sm font-semibold border-b border-border-primary text-foreground">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="inline text-muted-foreground ai ai-Book w-5 lg:w-6"
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
          padding: 0.5rem;
          font-size: 0.875rem;
          color: var(--foreground);
        }
        .toc-list .toc-list {
          padding-left: 0.5rem;
          padding-top: 0.5rem;
        }
        .toc-list-item {
          padding-bottom: 0.5rem;
        }
        .toc-list-item:last-child {
          padding-bottom: 0;
        }

        .toc-link {
          word-break: break-word; /* 長い単語を途中で折り返す */
          overflow-wrap: break-word; /* 長い単語を途中で折り返す */
          font-size: 0.875rem;
          line-height: 1.25rem;
          color: var(--muted-foreground);
          text-decoration: none;
          transition: color 0.2s ease;
        }

        .toc-link:hover {
          color: var(--foreground);
        }

        .is-active-link {
          font-weight: 800;
          word-break: break-word; /* 長い単語を途中で折り返す */
          overflow-wrap: break-word; /* 長い単語を途中で折り返す */
          color: var(--foreground) !important;
        }
      `}</style>
    </div>
  );
};

export default TableOfContents;
