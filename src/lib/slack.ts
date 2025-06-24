import { ContactFormData, CONTACT_CATEGORY_LABELS } from "@/types/contact";

export interface SlackMessage {
  channel?: string;
  username?: string;
  text: string;
  attachments?: SlackAttachment[];
}

export interface SlackAttachment {
  color: string;
  fields: SlackField[];
  footer?: string;
  ts?: number;
}

export interface SlackField {
  title: string;
  value: string;
  short: boolean;
}

export async function sendSlackNotification(data: ContactFormData): Promise<void> {
  const webhookUrl = process.env.SLACK_WEBHOOK_URL;
  
  if (!webhookUrl) {
    console.warn("SLACK_WEBHOOK_URL is not configured. Skipping Slack notification.");
    return;
  }

  const categoryLabel = CONTACT_CATEGORY_LABELS[data.category];
  const color = getColorByCategory(data.category);

  const message: SlackMessage = {
    channel: process.env.SLACK_CHANNEL || "#お問い合わせ",
    username: "Contact Form",
    text: "新しいお問い合わせが届きました",
    attachments: [
      {
        color,
        fields: [
          {
            title: "名前",
            value: data.name,
            short: true
          },
          {
            title: "カテゴリ",
            value: categoryLabel,
            short: true
          },
          {
            title: "メールアドレス",
            value: data.email,
            short: false
          },
          ...(data.relatedArticleTitle ? [{
            title: "関連記事",
            value: data.relatedArticleTitle,
            short: false
          }] : []),
          ...(data.relatedArticleUrl ? [{
            title: "記事URL",
            value: data.relatedArticleUrl,
            short: false
          }] : []),
          {
            title: "メッセージ",
            value: data.message.length > 300 
              ? `${data.message.substring(0, 300)}...` 
              : data.message,
            short: false
          }
        ],
        footer: "MakeTech Contact Form",
        ts: Math.floor(data.timestamp.getTime() / 1000)
      }
    ]
  };

  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(message),
    });

    if (!response.ok) {
      throw new Error(`Slack API error: ${response.status} ${response.statusText}`);
    }

    console.log("Slack notification sent successfully");
  } catch (error) {
    console.error("Failed to send Slack notification:", error);
    // Slackの通知失敗は処理を停止させない
    throw error;
  }
}

function getColorByCategory(category: string): string {
  switch (category) {
    case "general":
      return "good"; // 緑
    case "feedback":
      return "#36a64f"; // 明るい緑
    case "correction":
      return "warning"; // 黄色
    case "business":
      return "#764FA5"; // 紫
    case "technical":
      return "#2196F3"; // 青
    default:
      return "#808080"; // グレー
  }
}