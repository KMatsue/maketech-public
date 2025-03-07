import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "作業用ツール集",
  description: "文字数カウンターなど、日常作業に役立つツール集です。",
  keywords: ["ツール", "ユーティリティ", "文字数カウント", "Web開発"],
};

const ToolsPage = () => {
  return (
    <main className="container mx-auto w-full mt-14 px-4 md:px-8 lg:px-16">
      <div className="mx-auto lg:w-9/12">
        <header className="text-center my-8">
          <h1 className="text-4xl font-bold mb-4">作業用ツール集</h1>
          <p className="text-lg text-gray-700 dark:text-gray-300">
            日常の作業をサポートする便利なツール集です
          </p>
        </header>

        <section className="mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Link
              href="/tools/char-counter"
              className="block p-6 border border-gray-300 dark:border-gray-700 rounded-lg hover:shadow-md transition duration-300"
            >
              <h2 className="text-xl font-semibold mb-3">文字数カウンター</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                テキストの文字数、単語数、行数を瞬時にカウントします。
              </p>
              <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
                使ってみる →
              </span>
            </Link>

            <Link
              href="/tools/color-picker"
              className="block p-6 border border-gray-300 dark:border-gray-700 rounded-lg hover:shadow-md transition duration-300"
            >
              <h2 className="text-xl font-semibold mb-3">カラーピッカー</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                HEX、RGB、HSLなど様々な形式のカラーコードを選択・変換できるツールです。
              </p>
              <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
                使ってみる →
              </span>
            </Link>
            <Link
              href="/tools/regex-tester"
              className="block p-6 border border-gray-300 dark:border-gray-700 rounded-lg hover:shadow-md transition duration-300"
            >
              <h2 className="text-xl font-semibold mb-3">正規表現テスター</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                正規表現をリアルタイムでテスト、マッチや置換結果を確認できます。
              </p>
              <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
                使ってみる →
              </span>
            </Link>

            <Link
              href="/tools/text-diff"
              className="block p-6 border border-gray-300 dark:border-gray-700 rounded-lg hover:shadow-md transition duration-300"
            >
              <h2 className="text-xl font-semibold mb-3">テキスト差分比較</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                2つのテキストの違いを視覚的に比較、追加/削除/変更を確認できます。
              </p>
              <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
                使ってみる →
              </span>
            </Link>
            <Link
              href="/tools/json-formatter"
              className="block p-6 border border-gray-300 dark:border-gray-700 rounded-lg hover:shadow-md transition duration-300"
            >
              <h2 className="text-xl font-semibold mb-3">JSONフォーマッター</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                JSONデータの整形、検証、パス抽出、ツリー表示ができるツールです。
              </p>
              <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
                使ってみる →
              </span>
            </Link>
            <Link
              href="/tools/object-formatter"
              className="block p-6 border border-gray-300 dark:border-gray-700 rounded-lg hover:shadow-md transition duration-300"
            >
              <h2 className="text-xl font-semibold mb-3">
                オブジェクト文字列フォーマッター
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Dart/Java/Kotlinなどのオブジェクト文字列を見やすく整形して表示します
              </p>
              <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
                使ってみる →
              </span>
            </Link>
            <Link
              href="/tools/qr-generator"
              className="block p-6 border border-gray-300 dark:border-gray-700 rounded-lg hover:shadow-md transition duration-300"
            >
              <h2 className="text-xl font-semibold mb-3">
                QRコードジェネレーター
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                テキスト、URL、連絡先情報などからQRコードを簡単に生成できます。
              </p>
              <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
                使ってみる →
              </span>
            </Link>
            <Link
              href="/tools/responsive-tester"
              className="block p-6 border border-gray-300 dark:border-gray-700 rounded-lg hover:shadow-md transition duration-300"
            >
              <h2 className="text-xl font-semibold mb-3">
                レスポンシブデザインテスター
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                異なるデバイスサイズでWebサイトの表示を同時に確認できるツールです。
              </p>
              <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
                使ってみる →
              </span>
            </Link>
            {/* 他のツールカードを追加 */}
          </div>
        </section>
      </div>
    </main>
  );
};

export default ToolsPage;
