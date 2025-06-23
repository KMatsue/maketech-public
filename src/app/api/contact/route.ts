import {
  ContactFormData,
  ContactCategory,
  ContactResponse,
} from "@/types/contact";
import { sendSlackNotification } from "@/lib/slack";
import { saveContactToNotion } from "@/lib/notionContact";

// レート制限用のメモリストア
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

export async function POST(req: Request) {
  try {
    // リクエストボディの取得
    const body = await req.json();
    const {
      name,
      email,
      message,
      category,
      relatedArticleUrl,
      relatedArticleTitle,
    } = body;

    // IP アドレス取得（レート制限用）
    const clientIP =
      req.headers.get("x-forwarded-for") ||
      req.headers.get("x-real-ip") ||
      "unknown";

    // レート制限チェック
    if (isRateLimited(clientIP)) {
      return new Response(
        JSON.stringify({
          success: false,
          error: "Too many requests. Please try again later.",
        } as ContactResponse),
        { status: 429 }
      );
    }

    // バリデーション
    const validationError = validateContactData(body);
    if (validationError) {
      return new Response(
        JSON.stringify({
          success: false,
          error: validationError,
        } as ContactResponse),
        { status: 400 }
      );
    }

    // データの構築
    const contactData: ContactFormData = {
      name: sanitizeInput(name),
      email: sanitizeInput(email),
      message: sanitizeInput(message),
      category: category as ContactCategory,
      relatedArticleUrl: relatedArticleUrl
        ? sanitizeInput(relatedArticleUrl)
        : undefined,
      relatedArticleTitle: relatedArticleTitle
        ? sanitizeInput(relatedArticleTitle)
        : undefined,
      timestamp: new Date(),
    };

    let notionPageId: string | undefined;

    // 並行処理でSlack通知とNotion保存を実行
    const [slackResult, notionResult] = await Promise.allSettled([
      sendSlackNotification(contactData),
      saveContactToNotion(contactData),
    ]);

    // Slack通知の結果確認
    if (slackResult.status === "rejected") {
      console.error("Slack notification failed:", slackResult.reason);
      // Slack通知の失敗は処理を継続
    }

    // Notion保存の結果確認
    if (notionResult.status === "fulfilled") {
      notionPageId = notionResult.value;
      console.log("Contact saved to Notion with ID:", notionPageId);
    } else {
      console.error("Notion save failed:", notionResult.reason);
      // Notion保存失敗時はSlackに警告通知
      try {
        await sendSlackNotification({
          ...contactData,
          message: `⚠️ Notion保存に失敗しました\n\n元のメッセージ: ${contactData.message}`,
        });
      } catch (slackError) {
        console.error(
          "Failed to send Notion failure notification to Slack:",
          slackError
        );
      }
    }

    // レート制限カウンターを更新
    updateRateLimit(clientIP);

    return new Response(
      JSON.stringify({
        success: true,
        message: "お問い合わせを受け付けました",
        ...(notionPageId && { id: notionPageId }),
      } as ContactResponse),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error("Contact form error:", error);
    return new Response(
      JSON.stringify({
        success: false,
        error: "内部サーバーエラーが発生しました",
      } as ContactResponse),
      { status: 500 }
    );
  }
}

function validateContactData(data: any): string | null {
  if (
    !data.name ||
    typeof data.name !== "string" ||
    data.name.trim().length === 0
  ) {
    return "名前は必須です";
  }

  if (!data.email || typeof data.email !== "string") {
    return "メールアドレスは必須です";
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(data.email)) {
    return "有効なメールアドレスを入力してください";
  }

  if (
    !data.message ||
    typeof data.message !== "string" ||
    data.message.trim().length === 0
  ) {
    return "メッセージは必須です";
  }

  if (data.message.length > 2000) {
    return "メッセージは2000文字以内で入力してください";
  }

  if (
    !data.category ||
    !Object.values(ContactCategory).includes(data.category)
  ) {
    return "有効なカテゴリを選択してください";
  }

  return null;
}

function sanitizeInput(input: string): string {
  return input.trim().replace(/<[^>]*>/g, ""); // HTMLタグを除去
}

function isRateLimited(clientIP: string): boolean {
  const now = Date.now();
  const windowMs = 60 * 1000; // 1分
  const maxRequests = 3; // 1分間に3回まで

  const record = rateLimitStore.get(clientIP);

  if (!record || now > record.resetTime) {
    return false;
  }

  return record.count >= maxRequests;
}

function updateRateLimit(clientIP: string): void {
  const now = Date.now();
  const windowMs = 60 * 1000; // 1分

  const record = rateLimitStore.get(clientIP);

  if (!record || now > record.resetTime) {
    rateLimitStore.set(clientIP, {
      count: 1,
      resetTime: now + windowMs,
    });
  } else {
    rateLimitStore.set(clientIP, {
      count: record.count + 1,
      resetTime: record.resetTime,
    });
  }
}

export async function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: {
      Allow: "POST, OPTIONS",
    },
  });
}
