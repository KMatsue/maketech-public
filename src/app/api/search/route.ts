import { NextRequest, NextResponse } from "next/server";
import { getAllPosts } from "@/lib/notionAPI";

// 開発ツールの静的データ
const TOOLS_DATA = [
  {
    id: "char-counter",
    title: "文字数カウンター",
    description: "テキストの文字数、単語数、行数をリアルタイムで計測できるツール",
    keywords: ["文字数", "カウンター", "テキスト解析"],
    slug: "/tools/char-counter",
    type: "tool" as const,
  },
  {
    id: "color-picker",
    title: "カラーピッカー",
    description: "色を選択して、HEX、RGB、HSL形式で色コードを取得できるツール",
    keywords: ["色", "カラー", "HEX", "RGB", "HSL"],
    slug: "/tools/color-picker",
    type: "tool" as const,
  },
  {
    id: "csv-to-json",
    title: "CSV to JSON 変換",
    description: "CSVファイルをJSON形式に変換するツール",
    keywords: ["CSV", "JSON", "変換", "コンバーター"],
    slug: "/tools/csv-to-json",
    type: "tool" as const,
  },
  {
    id: "json-formatter",
    title: "JSON フォーマッター",
    description: "JSONデータの整形、検証、パス抽出ができる高機能ツール",
    keywords: ["JSON", "フォーマッター", "整形", "検証"],
    slug: "/tools/json-formatter",
    type: "tool" as const,
  },
  {
    id: "markdown-to-pdf",
    title: "Markdown to PDF",
    description: "Markdownテキストを美しいPDFドキュメントに変換するツール",
    keywords: ["Markdown", "PDF", "変換", "ドキュメント"],
    slug: "/tools/markdown-to-pdf",
    type: "tool" as const,
  },
  {
    id: "object-formatter",
    title: "オブジェクト フォーマッター",
    description: "JavaScript、Python、Java等のオブジェクトを整形・変換するツール",
    keywords: ["オブジェクト", "フォーマッター", "JavaScript", "Python"],
    slug: "/tools/object-formatter",
    type: "tool" as const,
  },
  {
    id: "qr-generator",
    title: "QRコード生成",
    description: "テキストやURLからQRコードを生成するツール",
    keywords: ["QR", "QRコード", "生成", "URL"],
    slug: "/tools/qr-generator",
    type: "tool" as const,
  },
  {
    id: "regex-tester",
    title: "正規表現テスター",
    description: "正規表現パターンのテストとマッチング結果を確認できるツール",
    keywords: ["正規表現", "regex", "テスト", "パターン"],
    slug: "/tools/regex-tester",
    type: "tool" as const,
  },
  {
    id: "responsive-tester",
    title: "レスポンシブテスター",
    description: "Webサイトのレスポンシブデザインを複数デバイスで確認できるツール",
    keywords: ["レスポンシブ", "デバイス", "テスト", "プレビュー"],
    slug: "/tools/responsive-tester",
    type: "tool" as const,
  },
  {
    id: "text-diff",
    title: "テキスト差分比較",
    description: "2つのテキストの違いを視覚的に比較・確認できるツール",
    keywords: ["差分", "比較", "テキスト", "diff"],
    slug: "/tools/text-diff",
    type: "tool" as const,
  },
];

// 検索結果の型定義
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

// 関連度スコア計算
const calculateRelevanceScore = (item: any, query: string): number => {
  const lowerQuery = query.toLowerCase();
  let score = 0;

  // タイトルの完全一致
  if (item.title.toLowerCase() === lowerQuery) {
    score += 100;
  }
  // タイトルに含まれる
  else if (item.title.toLowerCase().includes(lowerQuery)) {
    score += 50;
  }

  // 説明文に含まれる
  if (item.description.toLowerCase().includes(lowerQuery)) {
    score += 20;
  }

  // タグ・キーワードに含まれる
  const searchableTerms = [
    ...(item.tags || []),
    ...(item.keywords || []),
  ];
  
  for (const term of searchableTerms) {
    if (term.toLowerCase().includes(lowerQuery)) {
      score += 15;
    }
  }

  return score;
};

// 検索実行
const searchContent = async (query: string): Promise<SearchResult[]> => {
  const normalizedQuery = query.toLowerCase().trim();
  
  if (!normalizedQuery) {
    return [];
  }

  try {
    // ブログ記事を取得
    const posts = await getAllPosts();
    
    // 記事とツールを統合して検索
    const allContent = [
      ...posts.map((post: any) => ({
        ...post,
        type: "post" as const,
      })),
      ...TOOLS_DATA,
    ];

    // 検索実行
    const results = allContent
      .filter((item) => {
        const title = item.title.toLowerCase();
        const description = item.description.toLowerCase();
        const tags = item.tags || [];
        const keywords = item.keywords || [];
        
        return (
          title.includes(normalizedQuery) ||
          description.includes(normalizedQuery) ||
          tags.some((tag: string) => tag.toLowerCase().includes(normalizedQuery)) ||
          keywords.some((keyword: string) => keyword.toLowerCase().includes(normalizedQuery))
        );
      })
      .map((item) => ({
        id: item.id,
        title: item.title,
        description: item.description,
        slug: item.slug,
        type: item.type,
        tags: item.tags,
        keywords: item.keywords,
        date: item.date,
        relevanceScore: calculateRelevanceScore(item, normalizedQuery),
      }))
      .sort((a, b) => b.relevanceScore - a.relevanceScore)
      .slice(0, 20); // 最大20件

    return results;
  } catch (error) {
    console.error("Search error:", error);
    return [];
  }
};

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q");

  if (!query) {
    return NextResponse.json({ error: "検索クエリが必要です" }, { status: 400 });
  }

  try {
    const results = await searchContent(query);
    
    return NextResponse.json({
      query,
      results,
      total: results.length,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Search API error:", error);
    return NextResponse.json(
      { error: "検索中にエラーが発生しました" },
      { status: 500 }
    );
  }
}