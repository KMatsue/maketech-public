import React, { useEffect, useState } from "react";

interface MarkdownHelpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const MarkdownHelpModal: React.FC<MarkdownHelpModalProps> = ({
  isOpen,
  onClose,
}) => {
  // モーダル自体の表示/非表示を制御する状態
  const [isRendered, setIsRendered] = useState(false);

  // CSSアニメーションクラスを制御する状態
  const [animationClass, setAnimationClass] = useState("");

  useEffect(() => {
    if (isOpen) {
      // まずモーダルをDOMに表示（アニメーション前の初期状態）
      setIsRendered(true);

      // DOMに描画された後、わずかな遅延を入れてからアニメーションを開始
      const timer = setTimeout(() => {
        setAnimationClass("modal-visible");
      }, 10); // わずかな遅延を入れることで、CSSトランジションが適切に動作

      return () => clearTimeout(timer);
    } else {
      // モーダルを閉じる場合
      setAnimationClass(""); // アニメーションクラスを削除

      // アニメーション終了後にDOMから削除
      const timer = setTimeout(() => {
        setIsRendered(false);
      }, 300); // アニメーション時間に合わせる

      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // モーダルがレンダリングされていない場合は何も表示しない
  if (!isRendered) return null;

  return (
    <div
      className={`fixed inset-0 bg-black z-50 flex items-center justify-center p-4 transition-all duration-300 ease-in-out ${
        animationClass ? "bg-opacity-50" : "bg-opacity-0"
      }`}
      onClick={onClose}
      style={{
        backdropFilter: animationClass ? "blur(2px)" : "none",
        WebkitBackdropFilter: animationClass ? "blur(2px)" : "none",
      }}
    >
      <div
        className={`bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col transition-all duration-300 ease-in-out ${
          animationClass
            ? "opacity-100 translate-y-0 scale-100"
            : "opacity-0 translate-y-8 scale-95"
        }`}
        onClick={(e) => e.stopPropagation()} // モーダル内のクリックが親に伝播しないように
      >
        {/* ヘッダー */}
        <div className="border-b border-gray-200 dark:border-gray-700 p-4 flex justify-between items-center">
          <h2 className="text-xl font-semibold">マークダウンヘルプ</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* スクロール可能なコンテンツ */}
        <div className="p-6 overflow-y-auto">
          {/* マークダウンの説明 */}
          <div className="mb-6 bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg">
            <h3 className="font-semibold mb-2">マークダウンとは</h3>
            <p className="text-gray-700 dark:text-gray-300">
              マークダウンは、プレーンテキストを構造化された HTML
              に変換するための軽量マークアップ言語です。
              シンプルな記法でリッチなテキスト書式を実現できます。
            </p>
          </div>

          <h3 className="text-lg font-semibold mb-4">マークダウン記法の基本</h3>

          {/* マークダウン記法のグリッド */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
              <h4 className="font-semibold mb-2">見出し</h4>
              <pre className="bg-gray-100 dark:bg-gray-900 p-2 rounded-lg text-sm">
                # 見出し1
                <br />
                ## 見出し2
                <br />
                ### 見出し3
              </pre>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                # の数が多いほど小さな見出しになります。
              </p>
            </div>

            <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
              <h4 className="font-semibold mb-2">リスト</h4>
              <pre className="bg-gray-100 dark:bg-gray-900 p-2 rounded-lg text-sm">
                - 項目1
                <br />
                - 項目2
                <br />
                {"  "}- ネストした項目
                <br />
                <br />
                1. 番号付き項目1
                <br />
                2. 番号付き項目2
              </pre>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                ハイフンや数字でリストを作成できます。
              </p>
            </div>

            <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
              <h4 className="font-semibold mb-2">強調</h4>
              <pre className="bg-gray-100 dark:bg-gray-900 p-2 rounded-lg text-sm">
                *斜体* または _斜体_
                <br />
                **太字** または __太字__
                <br />
                ~~打ち消し線~~
              </pre>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                アスタリスクやアンダースコアでテキストを強調できます。
              </p>
            </div>

            <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
              <h4 className="font-semibold mb-2">リンクと画像</h4>
              <pre className="bg-gray-100 dark:bg-gray-900 p-2 rounded-lg text-sm">
                [リンクテキスト](https://example.com)
                <br />
                ![代替テキスト](画像のURL)
              </pre>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                []()でリンク、![]()で画像を挿入できます。
              </p>
            </div>

            <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
              <h4 className="font-semibold mb-2">表</h4>
              <pre className="bg-gray-100 dark:bg-gray-900 p-2 rounded-lg text-sm">
                | 列1 | 列2 |
                <br />
                |-----|-----|
                <br />
                | セル1 | セル2 |
                <br />| セル3 | セル4 |
              </pre>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                パイプ記号と区切り線で表を作成できます。
              </p>
            </div>

            <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
              <h4 className="font-semibold mb-2">コードブロック</h4>
              <pre className="bg-gray-100 dark:bg-gray-900 p-2 rounded-lg text-sm">
                ```javascript
                <br />
                function example() {`{`}
                <br />
                {'{"..."}'}return &quot;Hello World&quot;;
                <br />
                {`}`}
                <br />
                ```
              </pre>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                バッククォート3つでコードブロックを作成できます。
              </p>
            </div>
          </div>

          {/* その他の便利な記法 */}
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-4">その他の便利な記法</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                <h4 className="font-semibold mb-2">引用</h4>
                <pre className="bg-gray-100 dark:bg-gray-900 p-2 rounded-lg text-sm">
                  &gt; これは引用文です
                  <br />
                  &gt; 複数行にまたがることもできます
                </pre>
              </div>

              <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                <h4 className="font-semibold mb-2">水平線</h4>
                <pre className="bg-gray-100 dark:bg-gray-900 p-2 rounded-lg text-sm">
                  ---
                  <br />
                  または
                  <br />
                  ***
                </pre>
              </div>
            </div>
          </div>
        </div>

        {/* フッター */}
        <div className="border-t border-gray-200 dark:border-gray-700 p-4 bg-gray-50 dark:bg-gray-900"></div>
      </div>
    </div>
  );
};

export default MarkdownHelpModal;
