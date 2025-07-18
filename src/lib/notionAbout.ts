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

// スキルセットデータの型定義
export interface SkillItem {
  name: string;
  experience: string;
}

export interface Skill {
  category: string;
  items: SkillItem[];
}

// 趣味・関心事データの型定義
export interface HobbyItem {
  title: string;
  description: string;
}

// Notion APIレスポンスの型定義は必要に応じて追加

// 日付フォーマット関数
const formatDateRange = (
  startDate: string | null,
  endDate: string | null
): string => {
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
  return id.replace(/-/g, "");
};

// Notion APIから職務経歴データを取得
export const getCareersFromNotion = async (): Promise<CareerEvent[]> => {
  try {
    const databaseId = normalizeNotionId(
      process.env.NOTION_CARREERS_DATABASE_ID!
    );

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
      const title =
        item.properties.Title?.title?.[0]?.plain_text || "タイトル不明";
      const description =
        item.properties.Description?.rich_text?.[0]?.plain_text || "";
      const details = item.properties.Details?.rich_text?.[0]?.plain_text || "";
      const startDate = item.properties["StartDate"]?.date?.start || null;
      const endDate = item.properties["EndDate"]?.date?.start || null;

      // 日付の整形
      const date = formatDateRange(startDate, endDate);

      // 詳細を配列に変換
      const detailsArray = details
        .split("\n")
        .filter((detail: string) => detail.trim() !== "");

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
    const databaseId = normalizeNotionId(
      process.env.NOTION_PROJECTS_DATABASE_ID!
    );

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
      const title =
        item.properties.Title?.title?.[0]?.plain_text || "プロジェクト不明";
      const summary = item.properties.Summary?.rich_text?.[0]?.plain_text || "";
      const role = item.properties.Role?.rich_text?.[0]?.plain_text || "";
      const description =
        item.properties.Description?.rich_text?.[0]?.plain_text || "";
      const teamSize =
        item.properties.TeamSize?.rich_text?.[0]?.plain_text || "";
      const achievements =
        item.properties.Achievements?.rich_text?.[0]?.plain_text || "";
      const startDate = item.properties["StartDate"]?.date?.start || null;
      const endDate = item.properties["EndDate"]?.date?.start || null;

      // 日付の整形
      const period = formatDateRange(startDate, endDate);

      // 技術スタックの取得
      const frontend =
        item.properties.Frontend?.multi_select?.map((tech: any) => tech.name) ||
        [];
      const backend =
        item.properties.Backend?.multi_select?.map((tech: any) => tech.name) ||
        [];
      const database =
        item.properties.Database?.multi_select?.map((tech: any) => tech.name) ||
        [];
      const infrastructure =
        item.properties.Infrastructure?.multi_select?.map(
          (tech: any) => tech.name
        ) || [];
      const other =
        item.properties.Other?.multi_select?.map((tech: any) => tech.name) ||
        [];

      // 成果を配列に変換
      const achievementsArray = achievements
        .split("\n")
        .filter((achievement: string) => achievement.trim() !== "");

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

// Notion APIからスキルセットデータを取得
export const getSkillsFromNotion = async (): Promise<Skill[]> => {
  try {
    const databaseId = normalizeNotionId(
      process.env.NOTION_SKILLS_DATABASE_ID!
    );

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

    // カテゴリ別にグループ化（CategoryOrderも保持）
    const skillsByCategory: {
      [key: string]: { items: SkillItem[]; categoryOrder: number };
    } = {};

    response.results.forEach((item: any) => {
      const category = item.properties.Category?.select?.name || "その他";
      const name = item.properties.Name?.title?.[0]?.plain_text || "不明";
      const experience =
        item.properties.Experience?.rich_text?.[0]?.plain_text || "";
      const categoryOrder = item.properties.CategoryOrder?.number || 999; // デフォルトは最後

      if (!skillsByCategory[category]) {
        skillsByCategory[category] = { items: [], categoryOrder };
      }

      skillsByCategory[category].items.push({
        name,
        experience,
      });
    });

    // CategoryOrderでソートしてカテゴリを配列に変換
    const skills: Skill[] = Object.entries(skillsByCategory)
      .sort(([, a], [, b]) => a.categoryOrder - b.categoryOrder) // CategoryOrderでソート
      .map(([category, data]) => ({
        category,
        items: data.items,
      }));

    return skills;
  } catch (error) {
    console.error("Notion Skills API Error:", error);

    // エラー時は空の配列を返す
    return [];
  }
};

// Notion APIから専門分野データを取得
export const getSpecialtiesFromNotion = async (): Promise<string[]> => {
  try {
    const databaseId = normalizeNotionId(
      process.env.NOTION_SPECIALTIES_DATABASE_ID!
    );

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

    const specialties = response.results.map((item: any) => {
      // プロパティの取得
      const name =
        item.properties.Name?.title?.[0]?.plain_text || "専門分野不明";
      return name;
    });

    return specialties;
  } catch (error) {
    console.error("Notion Specialties API Error:", error);

    // エラー時は空の配列を返す
    return [];
  }
};

// Notion APIから趣味・関心事データを取得
export const getHobbiesFromNotion = async (): Promise<HobbyItem[]> => {
  try {
    const databaseId = normalizeNotionId(
      process.env.NOTION_HOBBIES_DATABASE_ID!
    );

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

    const hobbies = response.results.map((item: any) => {
      // プロパティの取得
      const title = item.properties.Title?.title?.[0]?.plain_text || "趣味不明";
      const description =
        item.properties.Description?.rich_text?.[0]?.plain_text || "";

      return {
        title,
        description,
      };
    });

    return hobbies;
  } catch (error) {
    console.error("Notion Hobbies API Error:", error);

    // エラー時は空の配列を返す
    return [];
  }
};

// Notion APIから趣味・関心事サマリーを取得
export const getHobbiesSummaryFromNotion = async (): Promise<string> => {
  try {
    const databaseId = normalizeNotionId(
      process.env.NOTION_HOBBIESSUMMARY_DATABASE_ID!
    );

    const response = await notion.databases.query({
      database_id: databaseId,
      page_size: 1,
    });

    if (response.results.length === 0) {
      return "";
    }

    const item = response.results[0] as any;
    const summary = item.properties.Content?.title?.[0]?.plain_text || "";

    return summary;
  } catch (error) {
    console.error("Notion Hobbies Summary API Error:", error);

    // エラー時は空の文字列を返す
    return "";
  }
};
