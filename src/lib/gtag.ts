export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID || "";

export const pageview = (url: string) => {
  window.gtag("config", GA_MEASUREMENT_ID, {
    page_path: url,
  });
};

// イベントトラッキング用の関数
export const event = ({
  action,
  category,
  label,
  value,
}: {
  action: string;
  category: string;
  label: string;
  value?: number;
}) => {
  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    window.gtag("event", action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

// window.gtagの型定義
declare global {
  interface Window {
    gtag: (
      command: "config" | "event",
      gaId: string,
      options: Record<string, any>
    ) => void;
  }
}

const handleSubmit = () => {
  // フォーム送信処理
  event({
    action: "submit_form",
    category: "engagement",
    label: "contact form",
  });
};
