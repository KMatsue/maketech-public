"use client";

import React from "react";
import Link from "next/link";
import { 
  DocumentTextIcon, 
  WrenchScrewdriverIcon,
  CalendarIcon,
  TagIcon 
} from "@heroicons/react/24/outline";

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

interface SearchResultsProps {
  results: SearchResult[];
  query: string;
  isLoading?: boolean;
  onResultClick?: (result: SearchResult) => void;
}

const SearchResults: React.FC<SearchResultsProps> = ({
  results,
  query,
  isLoading = false,
  onResultClick,
}) => {
  // ハイライト表示用の関数
  const highlightText = (text: string, query: string) => {
    if (!query.trim()) return text;
    
    const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
    const parts = text.split(regex);
    
    return parts.map((part, index) => 
      regex.test(part) ? (
        <mark key={index} className="bg-yellow-200 text-yellow-900 dark:bg-yellow-600 dark:text-yellow-100 rounded px-1">
          {part}
        </mark>
      ) : (
        part
      )
    );
  };

  // 結果をタイプ別にグループ化
  const groupedResults = results.reduce((acc, result) => {
    if (!acc[result.type]) {
      acc[result.type] = [];
    }
    acc[result.type].push(result);
    return acc;
  }, {} as Record<string, SearchResult[]>);

  // 日付をフォーマット
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('ja-JP', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    } catch {
      return dateString;
    }
  };

  // ローディング表示
  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
        <span className="ml-2 text-sm text-muted-foreground">検索中...</span>
      </div>
    );
  }

  // 結果なし
  if (!query.trim()) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        <MagnifyingGlassIcon className="h-12 w-12 mx-auto mb-2 opacity-50" />
        <p>検索キーワードを入力してください</p>
      </div>
    );
  }

  if (results.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        <DocumentTextIcon className="h-12 w-12 mx-auto mb-2 opacity-50" />
        <p>「{query}」に該当する結果が見つかりませんでした</p>
        <p className="text-sm mt-2">
          別のキーワードで検索するか、タグや開発ツール名で試してみてください
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* 検索結果サマリー */}
      <div className="text-sm text-muted-foreground">
        「{query}」の検索結果: {results.length}件
      </div>

      {/* 記事の結果 */}
      {groupedResults.post && (
        <section>
          <h3 className="flex items-center text-lg font-semibold mb-4 text-foreground">
            <DocumentTextIcon className="h-5 w-5 mr-2" />
            記事 ({groupedResults.post.length}件)
          </h3>
          <div className="space-y-3">
            {groupedResults.post.map((result) => (
              <Link
                key={result.id}
                href={`/posts/${result.slug}`}
                onClick={() => onResultClick?.(result)}
                className="
                  block p-4 rounded-lg border border-border
                  bg-card hover:bg-accent
                  transition-colors duration-200
                  group
                "
              >
                <div className="space-y-2">
                  <h4 className="font-medium text-card-foreground group-hover:text-accent-foreground">
                    {highlightText(result.title, query)}
                  </h4>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {highlightText(result.description, query)}
                  </p>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    {result.date && (
                      <div className="flex items-center gap-1">
                        <CalendarIcon className="h-3 w-3" />
                        {formatDate(result.date)}
                      </div>
                    )}
                    {result.tags && result.tags.length > 0 && (
                      <div className="flex items-center gap-1">
                        <TagIcon className="h-3 w-3" />
                        <span>{result.tags.slice(0, 3).join(", ")}</span>
                      </div>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* ツールの結果 */}
      {groupedResults.tool && (
        <section>
          <h3 className="flex items-center text-lg font-semibold mb-4 text-foreground">
            <WrenchScrewdriverIcon className="h-5 w-5 mr-2" />
            開発ツール ({groupedResults.tool.length}件)
          </h3>
          <div className="grid gap-3 sm:grid-cols-2">
            {groupedResults.tool.map((result) => (
              <Link
                key={result.id}
                href={result.slug}
                onClick={() => onResultClick?.(result)}
                className="
                  block p-4 rounded-lg border border-border
                  bg-card hover:bg-accent
                  transition-colors duration-200
                  group
                "
              >
                <div className="space-y-2">
                  <h4 className="font-medium text-card-foreground group-hover:text-accent-foreground">
                    {highlightText(result.title, query)}
                  </h4>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {highlightText(result.description, query)}
                  </p>
                  {result.keywords && result.keywords.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {result.keywords.slice(0, 4).map((keyword, index) => (
                        <span
                          key={index}
                          className="
                            inline-block px-2 py-1 text-xs
                            bg-secondary text-secondary-foreground
                            rounded-full
                          "
                        >
                          {keyword}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

// MagnifyingGlassIcon の import を修正
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

export default SearchResults;