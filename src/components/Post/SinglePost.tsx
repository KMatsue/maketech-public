"use client";

import Link from "next/link";

import React, { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
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
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);
  const tooltipTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const hideTooltipTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // ホバー開始時の処理
  const handleMouseEnter = (e: React.MouseEvent) => {
    // カーソルの画面上の絶対位置を記録
    const x = e.clientX + 15; // カーソルから15px右
    const y = e.clientY + 15; // カーソルから15px下
    setTooltipPos({ x, y });

    // すでに非表示タイマーがあれば解除
    if (hideTooltipTimeoutRef.current) {
      clearTimeout(hideTooltipTimeoutRef.current);
      hideTooltipTimeoutRef.current = null;
    }

    // すでに表示されている場合は何もしない
    if (showTooltip) return;

    // 0.4秒後にツールチップを表示
    tooltipTimeoutRef.current = setTimeout(() => {
      setShowTooltip(true);
    }, 400);
  };

  // マウス移動時にも位置を記録（まだ表示されていない場合のみ）
  const handleMouseMove = (e: React.MouseEvent) => {
    // ツールチップがまだ表示されていなければ位置を更新
    if (!showTooltip) {
      const x = e.clientX + 15;
      const y = e.clientY + 15;
      setTooltipPos({ x, y });
    }
  };

  // マウスが要素から出たら遅延して非表示
  const handleMouseLeave = () => {
    // 表示タイマーがあれば解除
    if (tooltipTimeoutRef.current) {
      clearTimeout(tooltipTimeoutRef.current);
      tooltipTimeoutRef.current = null;
    }

    // 0.2秒後にツールチップを非表示
    hideTooltipTimeoutRef.current = setTimeout(() => {
      setShowTooltip(false);
    }, 200);
  };

  // コンポーネントがアンマウントされる時にタイマーをクリア
  useEffect(() => {
    return () => {
      if (tooltipTimeoutRef.current) {
        clearTimeout(tooltipTimeoutRef.current);
      }
      if (hideTooltipTimeoutRef.current) {
        clearTimeout(hideTooltipTimeoutRef.current);
      }
    };
  }, []);

  return (
    <article
      ref={cardRef}
      className="group relative border border-border-primary rounded-lg p-5 cursor-pointer transition-all duration-300 hover:shadow-lg hover:bg-card-hover-bg flex flex-col lg:max-h-[180px]"
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <Link
        href={`/posts/${slug}`}
        className="absolute inset-0 z-0"
        aria-label={`Read more about ${title}`}
      >
        <span className="sr-only">Read more</span>
      </Link>

      <div className="mb-2 min-h-[1.5rem] lg:min-h-[3rem]">
        <h2 className="text-foreground text-xl font-medium line-clamp-1 lg:line-clamp-2">
          {title}
        </h2>
      </div>

      <div className="flex-grow"></div>

      <div className="mt-auto">
        <div className="text-muted-foreground mb-2">{date}</div>
        <div className="flex flex-wrap gap-2 overflow-hidden">
          {tags.map((tag, index) => (
            <TagLink key={index} tag={tag} />
          ))}
        </div>
      </div>

      {/* 画面上の固定位置を使ったツールチップ */}
      {showTooltip &&
        createPortal(
          <div
            className="fixed z-50 bg-black bg-opacity-80 text-white py-1 px-2 rounded text-sm max-w-xs transition-opacity duration-300 pointer-events-none"
            style={{
              left: `${tooltipPos.x}px`,
              top: `${tooltipPos.y}px`,
              maxWidth: "260px",
            }}
          >
            {title}
          </div>,
          document.body
        )}
    </article>
  );
};

export default SinglePost;
