"use client";

import { useState, useEffect, useCallback } from "react";

interface SearchResult {
  id: string;
  title: string;
  description: string;
  slug: string;
  type: "post" | "tool";
  tags?: string[];
  keywords?: string[];
  date?: string;
  relevanceScore: number;
}

interface SearchResponse {
  query: string;
  results: SearchResult[];
  total: number;
  timestamp: string;
}

interface UseSearchOptions {
  debounceMs?: number;
  minQueryLength?: number;
}

interface UseSearchReturn {
  query: string;
  results: SearchResult[];
  isLoading: boolean;
  error: string | null;
  total: number;
  search: (query: string) => void;
  clearSearch: () => void;
}

export const useSearch = (options: UseSearchOptions = {}): UseSearchReturn => {
  const { debounceMs = 300, minQueryLength = 1 } = options;
  
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [total, setTotal] = useState(0);

  // デバウンス用のタイマー
  const [debounceTimer, setDebounceTimer] = useState<NodeJS.Timeout | null>(null);

  // 検索API呼び出し
  const performSearch = useCallback(async (searchQuery: string) => {
    if (!searchQuery.trim() || searchQuery.length < minQueryLength) {
      setResults([]);
      setTotal(0);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `/api/search?q=${encodeURIComponent(searchQuery.trim())}`
      );

      if (!response.ok) {
        throw new Error(`検索エラー: ${response.status}`);
      }

      const data: SearchResponse = await response.json();
      
      setResults(data.results);
      setTotal(data.total);
    } catch (err) {
      console.error("Search error:", err);
      setError(err instanceof Error ? err.message : "検索中にエラーが発生しました");
      setResults([]);
      setTotal(0);
    } finally {
      setIsLoading(false);
    }
  }, [minQueryLength]);

  // デバウンス処理付きの検索実行
  const search = useCallback((searchQuery: string) => {
    setQuery(searchQuery);

    // 既存のタイマーをクリア
    if (debounceTimer) {
      clearTimeout(debounceTimer);
    }

    // 空文字の場合は即座にクリア
    if (!searchQuery.trim()) {
      setResults([]);
      setTotal(0);
      setIsLoading(false);
      return;
    }

    // デバウンス処理
    const timer = setTimeout(() => {
      performSearch(searchQuery);
    }, debounceMs);

    setDebounceTimer(timer);
  }, [debounceTimer, debounceMs, performSearch]);

  // 検索クリア
  const clearSearch = useCallback(() => {
    setQuery("");
    setResults([]);
    setTotal(0);
    setError(null);
    setIsLoading(false);
    
    if (debounceTimer) {
      clearTimeout(debounceTimer);
      setDebounceTimer(null);
    }
  }, [debounceTimer]);

  // クリーンアップ
  useEffect(() => {
    return () => {
      if (debounceTimer) {
        clearTimeout(debounceTimer);
      }
    };
  }, [debounceTimer]);

  return {
    query,
    results,
    isLoading,
    error,
    total,
    search,
    clearSearch,
  };
};