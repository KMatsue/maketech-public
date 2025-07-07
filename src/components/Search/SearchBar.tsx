"use client";

import React, { useState, useRef, useEffect } from "react";
import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/outline";

interface SearchBarProps {
  onSearch: (query: string) => void;
  onFocus?: () => void;
  onBlur?: () => void;
  placeholder?: string;
  className?: string;
  showHint?: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({
  onSearch,
  onFocus,
  onBlur,
  placeholder = "記事やツールを検索...",
  className = "",
  showHint = false,
}) => {
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // キーボードショートカット (Ctrl+K / Cmd+K)
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key === "k") {
        event.preventDefault();
        inputRef.current?.focus();
      }

      // Escapeキーでフォーカス解除
      if (event.key === "Escape") {
        inputRef.current?.blur();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  // 検索実行
  const handleSearch = (searchQuery: string) => {
    onSearch(searchQuery);
  };

  // 入力変更時
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value;
    setQuery(newQuery);
    handleSearch(newQuery);
  };

  // クリア
  const handleClear = () => {
    setQuery("");
    handleSearch("");
    inputRef.current?.focus();
  };

  // フォーカス時
  const handleFocus = () => {
    setIsFocused(true);
    onFocus?.();
  };

  // フォーカス解除時
  const handleBlur = () => {
    setIsFocused(false);
    onBlur?.();
  };

  return (
    <div className={`relative ${className}`}>
      <div
        className={`
          relative flex items-center
          bg-input border border-border rounded-lg
          transition-all duration-200 ease-in-out
          ${isFocused ? "ring-2 ring-primary/20 border-primary" : ""}
          hover:border-border-primary
        `}
      >
        {/* 検索アイコン */}
        <MagnifyingGlassIcon className="absolute left-3 h-4 w-4 text-muted-foreground pointer-events-none" />

        {/* 入力フィールド */}
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={handleInputChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder={placeholder}
          className="
            w-full pl-10 pr-20 py-2
            bg-transparent text-foreground placeholder-muted-foreground
            border-none outline-none
            text-sm
          "
        />

        {/* クリアボタン */}
        {query && (
          <button
            onClick={handleClear}
            className="
              absolute right-12 p-1
              text-muted-foreground hover:text-foreground
              transition-colors duration-200
            "
            aria-label="検索をクリア"
          >
            <XMarkIcon className="h-4 w-4" />
          </button>
        )}

        {/* キーボードショートカットヒント */}
        <div
          className="
          absolute right-2 px-2 py-1
          text-xs text-muted-foreground
          bg-muted border border-border rounded
          hidden sm:block
        "
        >
          ⌘K
        </div>
      </div>

      {/* フォーカス時のヒント */}
      {showHint && isFocused && !query && (
        <div
          className="
          absolute top-full left-0 right-0 mt-1
          text-xs text-muted-foreground
          bg-background border border-border rounded-lg
          p-2 shadow-lg z-[60]
        "
        >
          記事のタイトル、説明、タグで検索できます
        </div>
      )}
    </div>
  );
};

export default SearchBar;
