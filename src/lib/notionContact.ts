import { Client } from "@notionhq/client";
import { ContactFormData, CONTACT_CATEGORY_LABELS } from "@/types/contact";

const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

export interface NotionContactRecord {
  id: string;
  name: string;
  email: string;
  category: string;
  message: string;
  relatedArticleUrl?: string;
  relatedArticleTitle?: string;
  status: "未対応" | "対応中" | "完了";
  priority: "高" | "中" | "低";
  createdAt: string;
}

/**
 * Notion DatabaseにContactデータを保存
 */
export async function saveContactToNotion(
  data: ContactFormData
): Promise<string> {
  const databaseId = process.env.NOTION_CONTACT_DATABASE_ID;

  if (!databaseId) {
    throw new Error("NOTION_CONTACT_DATABASE_ID is not configured");
  }

  if (!process.env.NOTION_TOKEN) {
    throw new Error("NOTION_TOKEN is not configured");
  }

  try {
    const response = await notion.pages.create({
      parent: {
        database_id: databaseId,
      },
      properties: {
        名前: {
          title: [
            {
              text: {
                content: data.name,
              },
            },
          ],
        },
        メールアドレス: {
          email: data.email,
        },
        カテゴリ: {
          select: {
            name: CONTACT_CATEGORY_LABELS[data.category],
          },
        },
        メッセージ: {
          rich_text: [
            {
              text: {
                content: data.message.substring(0, 2000), // Notionのrich_text制限に対応
              },
            },
          ],
        },
        ...(data.relatedArticleUrl && {
          関連記事URL: {
            url: data.relatedArticleUrl,
          },
        }),
        ...(data.relatedArticleTitle && {
          関連記事タイトル: {
            rich_text: [
              {
                text: {
                  content: data.relatedArticleTitle,
                },
              },
            ],
          },
        }),
        送信日時: {
          date: {
            start: data.timestamp.toISOString(),
          },
        },
        ステータス: {
          select: {
            name: "未対応",
          },
        },
        優先度: {
          select: {
            name: getPriorityByCategory(data.category),
          },
        },
      },
    });

    console.log("Contact saved to Notion successfully:", response.id);
    return response.id;
  } catch (error) {
    console.error("Failed to save contact to Notion:", error);
    throw error;
  }
}

/**
 * カテゴリに基づいて優先度を決定
 */
function getPriorityByCategory(category: string): "高" | "中" | "低" {
  switch (category) {
    case "correction": // 記事の訂正依頼
      return "高";
    case "business": // お仕事の依頼
      return "高";
    case "technical": // 技術的な質問
      return "中";
    case "feedback": // 記事へのフィードバック
      return "中";
    case "general": // 一般的なお問い合わせ
    default:
      return "低";
  }
}

/**
 * Notion Databaseから問い合わせ一覧を取得
 */
export async function getContactsFromNotion(
  limit: number = 10,
  startCursor?: string
): Promise<{
  contacts: NotionContactRecord[];
  nextCursor?: string;
  hasMore: boolean;
}> {
  const databaseId = process.env.NOTION_CONTACT_DATABASE_ID;

  if (!databaseId) {
    throw new Error("NOTION_CONTACT_DATABASE_ID is not configured");
  }

  try {
    const response = await notion.databases.query({
      database_id: databaseId,
      sorts: [
        {
          property: "送信日時",
          direction: "descending",
        },
      ],
      page_size: limit,
      ...(startCursor && { start_cursor: startCursor }),
    });

    const contacts: NotionContactRecord[] = response.results.map(
      (page: any) => {
        const props = page.properties;
        return {
          id: page.id,
          name: props["名前"]?.title[0]?.text?.content || "",
          email: props["メールアドレス"]?.email || "",
          category: props["カテゴリ"]?.select?.name || "",
          message: props["メッセージ"]?.rich_text[0]?.text?.content || "",
          relatedArticleUrl: props["関連記事URL"]?.url || undefined,
          relatedArticleTitle:
            props["関連記事タイトル"]?.rich_text[0]?.text?.content || undefined,
          status:
            (props["ステータス"]?.select?.name as
              | "未対応"
              | "対応中"
              | "完了") || "未対応",
          priority:
            (props["優先度"]?.select?.name as "高" | "中" | "低") || "低",
          createdAt: props["送信日時"]?.date?.start || page.created_time,
        };
      }
    );

    return {
      contacts,
      nextCursor: response.next_cursor || undefined,
      hasMore: response.has_more,
    };
  } catch (error) {
    console.error("Failed to get contacts from Notion:", error);
    throw error;
  }
}

/**
 * 問い合わせのステータスを更新
 */
export async function updateContactStatus(
  pageId: string,
  status: "未対応" | "対応中" | "完了"
): Promise<void> {
  try {
    await notion.pages.update({
      page_id: pageId,
      properties: {
        ステータス: {
          select: {
            name: status,
          },
        },
      },
    });

    console.log(`Contact status updated to ${status} for page ${pageId}`);
  } catch (error) {
    console.error("Failed to update contact status:", error);
    throw error;
  }
}
