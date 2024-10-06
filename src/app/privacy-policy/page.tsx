import React from "react";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "プライバシーポリシー | MaKe TECH",
  description:
    "MaKe TECHのプライバシーポリシーページです。個人情報の取り扱い、著作権、免責事項について説明しています。",
};

const PrivacyPolicy = () => {
  return (
    <main className="container mx-auto w-full mt-14 px-4 md:px-8 lg:px-16">
      <div className="mx-auto lg:w-9/12">
        <header className="text-center my-8">
          <h1 className="text-4xl font-bold mb-4">プライバシーポリシー</h1>
          <p className="text-lg text-gray-700 dark:text-gray-300">
            最終更新日: 2024年4月1日
          </p>
        </header>

        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200 border-b border-gray-500">
              1. はじめに
            </h2>
            <p className="text-gray-700 dark:text-gray-300">
              MaKeTECH（以下、「当サイト」）は、ユーザーのプライバシーを尊重し、個人情報の保護に努めています。本プライバシーポリシーは、当サイトの利用に関して収集する情報と、その使用方法について説明します。
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200 border-b border-gray-500">
              2. 収集する情報
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-2">
              当サイトでは、以下の情報を収集する場合があります
            </p>
            <ul className="list-disc list-inside ml-4 text-gray-700 dark:text-gray-300">
              <li>
                アクセスログ（IPアドレス、ブラウザの種類、参照元ページなど）
              </li>
              <li>Google Analyticsを通じて収集される利用状況データ</li>
              <li>
                コンタクトフォームを通じて提供される個人情報（名前、メールアドレスなど）
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200 border-b border-gray-500">
              3. 情報の使用目的
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-2">
              収集した情報は、以下の目的で使用されます
            </p>
            <ul className="list-disc list-inside ml-4 text-gray-700 dark:text-gray-300">
              <li>サイトの利用状況分析と改善</li>
              <li>ユーザーからの問い合わせへの対応</li>
              <li>サービスの提供と管理</li>
              <li>新しいコンテンツや機能の開発</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200 border-b border-gray-500">
              4. Google Analyticsの使用
            </h2>
            <p className="text-gray-700 dark:text-gray-300">
              当サイトではGoogle
              Analyticsを使用してトラフィックデータを収集しています。これには、ユーザーの行動パターン、デバイス情報、地理的位置などが含まれます。Google
              Analyticsによって収集されたデータは、Googleのプライバシーポリシーに従って管理されます。
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200 border-b border-gray-500">
              5. クッキーの使用
            </h2>
            <p className="text-gray-700 dark:text-gray-300">
              当サイトでは、ユーザーエクスペリエンスの向上とサイト利用状況の分析のためにクッキーを使用しています。ユーザーはブラウザの設定でクッキーを無効にすることができますが、一部の機能が正常に動作しなくなる可能性があります。
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200 border-b border-gray-500">
              6. 情報の共有
            </h2>
            <p className="text-gray-700 dark:text-gray-300">
              収集した情報は、法律で要求される場合や、当サイトの権利を保護する必要がある場合を除き、第三者と共有されることはありません。
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200 border-b border-gray-500">
              7. セキュリティ
            </h2>
            <p className="text-gray-700 dark:text-gray-300">
              当サイトは、収集した個人情報を保護するために適切な技術的・組織的措置を講じています。ただし、インターネット上での完全なセキュリティを保証することはできません。
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200 border-b border-gray-500">
              8. ユーザーの権利
            </h2>
            <p className="text-gray-700 dark:text-gray-300">
              ユーザーは、自身の個人情報へのアクセス、訂正、削除を要求する権利を有しています。これらの要求や、プライバシーに関する質問がある場合は、コンタクトページからお問い合わせください。
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200 border-b border-gray-500">
              9. 著作権
            </h2>
            <p className="text-gray-700 dark:text-gray-300">
              当サイトで掲載している画像の著作権・肖像権等は各権利所有者に帰属します。当サイトのコンテンツ（記事・画像・その他プログラム）について、許可なく転載することを禁じます。引用の際は、当サイトへのリンクを掲載するとともに、引用元であることを明記してください。コンテンツに関する問題がある場合は、お問い合わせページからご連絡ください。
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200 border-b border-gray-500">
              10. 免責事項
            </h2>
            <p className="text-gray-700 dark:text-gray-300">
              当サイトからのリンクで移動した外部サイトの情報やサービスについて、当サイトは一切の責任を負いません。当サイトのコンテンツについては、正確な情報を提供するよう努めていますが、情報の完全性、正確性、有用性等を保証するものではありません。当サイトの利用によって生じた損害について、当サイトは一切の責任を負いかねますのでご了承ください。
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200 border-b border-gray-500">
              11. プライバシーポリシーの変更
            </h2>
            <p className="text-gray-700 dark:text-gray-300">
              当サイトは、必要に応じてプライバシーポリシーを更新することがあります。変更後のプライバシーポリシーは、本ページに掲載したときから効力を生じるものとします。
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200 border-b border-gray-500">
              12. お問い合わせ
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-2">
              本プライバシーポリシーに関するお問い合わせは、以下のコンタクトページからお願いします
            </p>
            <p className="mt-4">
              <Link href="/contact" className="text-blue-600 hover:underline">
                コンタクトページ
              </Link>
            </p>
            <p className="mt-4 text-gray-700 dark:text-gray-300">
              コンタクトフォームを通じて、プライバシーに関する質問や個人情報の取り扱いについての要望をお送りください。
            </p>
          </section>
        </div>
      </div>
    </main>
  );
};

export default PrivacyPolicy;
