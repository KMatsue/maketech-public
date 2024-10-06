import { Metadata } from "next";
// import CookieConsent from "react-cookie-consent";
import "@/styles/globals.css";
import { inter } from "@/app/ui/fonts";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import Providers from "@/components/Providers";
import GoogleAnalytics from "@/components/GoogleAnalytics";

export const revalidate = 300;

export const metadata: Metadata = {
  title: {
    default: "MaKe TECH",
    template: "%s | MaKe TECH",
  },
  description:
    "Web開発、プログラミング、技術に関する情報を提供するテックブログ",
  keywords: [
    "Web開発",
    "プログラミング",
    "技術ブログ",
    "ソフトウェアエンジニアリング",
    "アプリ開発",
  ],
  authors: [{ name: "MaKe" }],
  creator: "MaKe",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
  openGraph: {
    type: "website",
    locale: "ja_JP",
    url: "https://www.maketech.net/",
    siteName: "MaKeTECH",
  },
  // twitter: {
  //   card: "summary_large_image",
  //   site: "@yourtwitterhandle",
  //   creator: "@yourtwitterhandle",
  // },
  alternates: {
    types: {
      "application/rss+xml": [{ url: "/api/feed", title: "MaKeTECH RSS Feed" }],
    },
  },
};
const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="ja">
      <body
        className={`${inter.className} antialiased flex flex-col min-h-screen`}
      >
        <Providers>
          <Navbar />
          <main className="flex-grow relative z-10 mb-16">{children}</main>
          <Footer />
          <GoogleAnalytics />
          {/* <CookieConsent
            location="bottom"
            buttonText="同意する"
            declineButtonText="拒否"
            cookieName="ga-consent"
            style={{ background: "#2B373B" }}
            buttonStyle={{ color: "#4e503b", fontSize: "13px" }}
            expires={150}
          >
            このウェブサイトはCookieを使用してユーザー体験を向上させています。
          </CookieConsent> */}
        </Providers>
      </body>
    </html>
  );
};
export default RootLayout;
