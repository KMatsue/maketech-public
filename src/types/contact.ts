export enum ContactCategory {
  GENERAL = "general",           // 一般的なお問い合わせ
  ARTICLE_FEEDBACK = "feedback", // 記事へのフィードバック
  ARTICLE_CORRECTION = "correction", // 記事の訂正依頼
  BUSINESS = "business",         // お仕事の依頼
  TECHNICAL = "technical"        // 技術的な質問
}

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
  category: ContactCategory;
  relatedArticleUrl?: string;
  relatedArticleTitle?: string;
  timestamp: Date;
}

export interface ContactResponse {
  success: boolean;
  message: string;
  id?: string;
  error?: string;
}

export const CONTACT_CATEGORY_LABELS: Record<ContactCategory, string> = {
  [ContactCategory.GENERAL]: "一般的なお問い合わせ",
  [ContactCategory.ARTICLE_FEEDBACK]: "記事へのフィードバック",
  [ContactCategory.ARTICLE_CORRECTION]: "記事の訂正依頼",
  [ContactCategory.BUSINESS]: "お仕事のご依頼",
  [ContactCategory.TECHNICAL]: "技術的なご質問"
};