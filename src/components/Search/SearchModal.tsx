"use client";

import React, { useEffect, useRef } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import SearchBar from "./SearchBar";
import SearchResults from "./SearchResults";
import { useSearch } from "./useSearch";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const { query, results, isLoading, error, search, clearSearch } = useSearch();

  // Escapeキーで閉じる
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      // スクロールを無効化
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "auto";
    };
  }, [isOpen, onClose]);

  // モーダル外クリックで閉じる
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  // モーダルが閉じられる時に検索をクリア
  useEffect(() => {
    if (!isOpen) {
      clearSearch();
    }
  }, [isOpen, clearSearch]);

  if (!isOpen) return null;

  const handleResultClick = () => {
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 md:pt-20">
      {/* オーバーレイ */}
      <div className="fixed inset-0 bg-background/80 backdrop-blur-sm" />

      {/* モーダルコンテンツ */}
      <div
        ref={modalRef}
        className="
          relative w-full max-w-2xl mx-4
          bg-background border border-border rounded-lg shadow-lg
          max-h-[80vh] flex flex-col
        "
      >
        {/* ヘッダー */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h2 className="text-lg font-semibold text-foreground">
            サイト内検索
          </h2>
          <button
            onClick={onClose}
            className="
              p-2 rounded-lg
              text-muted-foreground hover:text-foreground
              hover:bg-accent
              transition-colors duration-200
            "
            aria-label="検索モーダルを閉じる"
          >
            <XMarkIcon className="h-5 w-5" />
          </button>
        </div>

        {/* 検索バー */}
        <div className="p-4 border-b border-border">
          <SearchBar
            onSearch={search}
            placeholder="記事やツールを検索..."
            className="w-full"
            showHint={true}
          />
        </div>

        {/* 検索結果 */}
        <div className="flex-1 overflow-y-auto p-4">
          {error && (
            <div
              className="
              p-4 mb-4 rounded-lg
              bg-destructive/10 border border-destructive/20
              text-destructive
            "
            >
              {error}
            </div>
          )}

          <SearchResults
            results={results}
            query={query}
            isLoading={isLoading}
            onResultClick={handleResultClick}
          />
        </div>

        {/* フッター（ヒント） */}
        <div
          className="
          p-4 border-t border-border
          text-xs text-muted-foreground
          bg-muted/50
        "
        >
          <div className="flex items-center justify-between">
            <span>記事のタイトル、説明、タグで検索できます</span>
            <div className="flex items-center gap-2">
              <kbd className="px-2 py-1 bg-background border border-border rounded text-xs">
                ↑↓
              </kbd>
              <span>ナビゲート</span>
              <kbd className="px-2 py-1 bg-background border border-border rounded text-xs">
                Esc
              </kbd>
              <span>閉じる</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchModal;
