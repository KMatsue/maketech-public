"use client";

import React from "react";
import CookieConsent from "react-cookie-consent";
import Link from "next/link";

const CookieConsentBanner = () => {
  return (
    <CookieConsent
      location="bottom"
      buttonText="同意する"
      declineButtonText="拒否"
      cookieName="ga-consent"
      style={{ background: "#2B373B" }}
      buttonStyle={{
        color: "#ffffff",
        fontSize: "13px",
        backgroundColor: "#4e503b",
        borderRadius: "5px",
      }}
      declineButtonStyle={{
        color: "#ffffff",
        fontSize: "13px",
        backgroundColor: "#6c757d",
        borderRadius: "5px",
      }}
      expires={150}
      enableDeclineButton
      onDecline={() => {
        // Google Analyticsを無効化するロジックをここに追加
      }}
    >
      <p>
        当サイトでは、ユーザー体験の向上とサイトの利用状況分析のためにCookieを使用しています。
        これには、Google Analyticsによるトラフィック分析が含まれます。
        Cookieの使用に同意いただくことで、よりよいサービスの提供に役立てることができます。
        詳しくは
        <Link href="/privacy-policy" className="text-blue-400 hover:underline">
          プライバシーポリシー
        </Link>
        をご確認ください。
      </p>
    </CookieConsent>
  );
};

export default CookieConsentBanner;
