"use client";

import Script from "next/script";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { GA_MEASUREMENT_ID, pageview } from "@/lib/gtag";
import { hasAnalyticsConsent } from "@/lib/analytics";

export default function GoogleAnalytics() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (hasAnalyticsConsent() && pathname) {
      const url = pathname + searchParams.toString();
      // Google Analytics のスクリプトが読み込まれた後に pageview を呼び出す
      if (typeof window.gtag === "function") {
        pageview(url);
      }
    }
  }, [pathname, searchParams]);

  if (process.env.NODE_ENV !== "production" || !hasAnalyticsConsent()) {
    return null;
  }

  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
    </>
  );
}
