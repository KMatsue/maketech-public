"use client";

import React from "react";
import Link from "next/link";
import { ContactCategory } from "@/types/contact";

interface ArticleFeedbackProps {
  articleTitle: string;
  articleUrl: string;
}

const ArticleFeedback: React.FC<ArticleFeedbackProps> = ({
  articleTitle,
  articleUrl,
}) => {
  const createContactUrl = (category: ContactCategory) => {
    const params = new URLSearchParams({
      category,
      articleTitle,
      articleUrl,
    });
    return `/contact?${params.toString()}`;
  };

  return (
    <section className="mt-16 mb-8 p-6 border-2 border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800/50">
      <div className="text-center">
        <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">
          この記事についてご質問・ご指摘はありませんか？
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
          技術記事は日々進歩する分野のため、フィードバックを積極的に収集しています。
          <br />
          お気軽にご質問や改善点をお聞かせください。
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
          <Link
            href={createContactUrl(ContactCategory.ARTICLE_FEEDBACK)}
            className="inline-flex items-center px-4 py-2 border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white rounded-md transition-colors duration-200 text-sm font-medium"
          >
            <svg
              className="w-4 h-4 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-3.582 8-8 8a8.955 8.955 0 01-2.697-.413l-4.834 2.416c-.322.161-.7-.145-.593-.505l2.416-4.834A8.955 8.955 0 013 12c0-4.418 3.582-8 8-8s8 3.582 8 8z"
              />
            </svg>
            質問・感想を送る
          </Link>

          <Link
            href={createContactUrl(ContactCategory.ARTICLE_CORRECTION)}
            className="inline-flex items-center px-4 py-2 border border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white rounded-md transition-colors duration-200 text-sm font-medium"
          >
            <svg
              className="w-4 h-4 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
              />
            </svg>
            訂正・改善を提案
          </Link>
        </div>

        <div className="mt-4">
          <Link
            href="/contact"
            className="text-xs text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 underline"
          >
            その他のお問い合わせはこちら
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ArticleFeedback;
