export const hasAnalyticsConsent = () => {
  if (typeof document === "undefined") return false;
  return document.cookie
    .split(";")
    .some((item) => item.trim().startsWith("ga-consent=true"));
};

// 既存のGoogle Analytics Cookieを削除する関数
export const removeGoogleAnalyticsCookies = () => {
  const gaCookies = ["_ga", "_gid", "_gat"];
  if (gaCookies.some((cookie) => document.cookie.includes(cookie))) {
    const domain = window.location.hostname;
    gaCookies.forEach((cookieName) => {
      document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${domain}`;
      document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=.${domain}`;
    });
  }
};
