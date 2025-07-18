import { Client } from "@notionhq/client";

// Notion クライアントの初期化
const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

// 職務経歴データの型定義
export interface CareerEvent {
  date: string;
  title: string;
  description: string;
  details: string[];
}

// プロジェクト経歴データの型定義（Accordionコンポーネントと互換性確保）
export interface ProjectDetail {
  title: string;
  period: string;
  summary?: string;
  role: string;
  description: string;
  technologies: {
    frontend?: string[];
    backend?: string[];
    database?: string[];
    infrastructure?: string[];
    other?: string[];
  };
  teamSize: string;
  achievements?: string[];
}

// Notion APIレスポンスの型定義は必要に応じて追加

// 日付フォーマット関数
const formatDateRange = (startDate: string | null, endDate: string | null): string => {
  if (!startDate) return "期間不明";
  
  const start = new Date(startDate);
  const startFormatted = `${start.getFullYear()}年${start.getMonth() + 1}月`;
  
  if (!endDate) {
    return `${startFormatted} - 現在`;
  }
  
  const end = new Date(endDate);
  const endFormatted = `${end.getFullYear()}年${end.getMonth() + 1}月`;
  
  return `${startFormatted} - ${endFormatted}`;
};

// Database IDを正規化（ハイフンを削除）
const normalizeNotionId = (id: string): string => {
  return id.replace(/-/g, '');
};

// Notion APIから職務経歴データを取得
export const getCareersFromNotion = async (): Promise<CareerEvent[]> => {
  try {
    const databaseId = normalizeNotionId(process.env.NOTION_CARREERS_DATABASE_ID!);
    
    // SortOrderでソートしてデータを取得
    const response = await notion.databases.query({
      database_id: databaseId,
      sorts: [
        {
          property: "SortOrder",
          direction: "ascending",
        },
      ],
    });

    const careers = response.results.map((item: any) => {
      // プロパティの取得
      const title = item.properties.Title?.title?.[0]?.plain_text || "タイトル不明";
      const description = item.properties.Description?.rich_text?.[0]?.plain_text || "";
      const details = item.properties.Details?.rich_text?.[0]?.plain_text || "";
      const startDate = item.properties["StartDate"]?.date?.start || null;
      const endDate = item.properties["EndDate"]?.date?.start || null;

      // 日付の整形
      const date = formatDateRange(startDate, endDate);

      // 詳細を配列に変換
      const detailsArray = details
        .split('\n')
        .filter((detail: string) => detail.trim() !== '');

      return {
        date,
        title,
        description,
        details: detailsArray,
      };
    });

    return careers;
  } catch (error) {
    console.error("Notion API Error:", error);
    
    // エラー時は空の配列を返す
    return [];
  }
};

// 型チェック用のサンプル関数（開発用）
export const validateCareerData = (data: any): data is CareerEvent => {
  return (
    typeof data === "object" &&
    typeof data.date === "string" &&
    typeof data.title === "string" &&
    typeof data.description === "string" &&
    Array.isArray(data.details) &&
    data.details.every((detail: any) => typeof detail === "string")
  );
};

// Notion APIからプロジェクト経歴データを取得
export const getProjectsFromNotion = async (): Promise<ProjectDetail[]> => {
  try {
    const databaseId = normalizeNotionId(process.env.NOTION_PROJECTS_DATABASE_ID!);
    
    // SortOrderでソートしてデータを取得
    const response = await notion.databases.query({
      database_id: databaseId,
      sorts: [
        {
          property: "SortOrder",
          direction: "ascending",
        },
      ],
    });

    const projects = response.results.map((item: any) => {
      // プロパティの取得
      const title = item.properties.Title?.title?.[0]?.plain_text || "プロジェクト不明";
      const summary = item.properties.Summary?.rich_text?.[0]?.plain_text || "";
      const role = item.properties.Role?.rich_text?.[0]?.plain_text || "";
      const description = item.properties.Description?.rich_text?.[0]?.plain_text || "";
      const teamSize = item.properties.TeamSize?.rich_text?.[0]?.plain_text || "";
      const achievements = item.properties.Achievements?.rich_text?.[0]?.plain_text || "";
      const startDate = item.properties["StartDate"]?.date?.start || null;
      const endDate = item.properties["EndDate"]?.date?.start || null;

      // 日付の整形
      const period = formatDateRange(startDate, endDate);

      // 技術スタックの取得
      const frontend = item.properties.Frontend?.multi_select?.map((tech: any) => tech.name) || [];
      const backend = item.properties.Backend?.multi_select?.map((tech: any) => tech.name) || [];
      const database = item.properties.Database?.multi_select?.map((tech: any) => tech.name) || [];
      const infrastructure = item.properties.Infrastructure?.multi_select?.map((tech: any) => tech.name) || [];
      const other = item.properties.Other?.multi_select?.map((tech: any) => tech.name) || [];

      // 成果を配列に変換
      const achievementsArray = achievements
        .split('\n')
        .filter((achievement: string) => achievement.trim() !== '');

      return {
        title,
        period,
        summary,
        role,
        description,
        technologies: {
          frontend,
          backend,
          database,
          infrastructure,
          other,
        },
        teamSize,
        achievements: achievementsArray,
      };
    });

    return projects;
  } catch (error) {
    console.error("Notion Projects API Error:", error);
    
    // エラー時は空の配列を返す
    return [];
  }
};

// デバッグ用の関数
export const debugNotionCareerData = async () => {
  try {
    const response = await notion.databases.query({
      database_id: process.env.NOTION_CARREERS_DATABASE_ID!,
      page_size: 1,
    });

    console.log("Notion Career Database Response:");
    console.log(JSON.stringify(response.results[0], null, 2));
  } catch (error) {
    console.error("Debug Error:", error);
  }
};