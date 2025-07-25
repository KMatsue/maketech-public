# MaKeTECH Overview

## 1. プロジェクト概要

### アプリケーションの目的

このアプリケーションは、個人の技術ブログとして機能するウェブアプリケーションです。主な目的は以下の通りです。

1. 技術的な学習や経験のアウトプット
2. 個人のスキルセットと経歴の紹介
3. プロジェクト実績の展示
4. 技術コミュニティとの交流促進
5. サイトの利用状況と訪問者の行動分析

### 主な機能

1. ブログ記事の表示と管理

   - Notion API を利用した効率的な記事管理
   - タグによる記事の分類と検索
   - 記事内の目次生成

2. サイト内検索機能

   - リアルタイム検索：入力と同時に結果を表示
   - 統合検索：ブログ記事と開発ツール 12 種を同時検索
   - キーボードショートカット：`Ctrl+K` / `Cmd+K` でワンタッチアクセス
   - ハイライト表示：検索語を結果内で強調表示
   - デバウンス処理によるパフォーマンス最適化

3. ポートフォリオ機能

   - 経歴やスキルセットの紹介（About ページ）
   - プロジェクト実績の詳細表示

4. ユーザーエクスペリエンス向上機能

   - レスポンシブデザインによるマルチデバイス対応
   - 統一テーマシステム（Light、Dark、Terminal Green、Sunset Orange）
   - ページネーションによる効率的な記事ナビゲーション

5. コンタクトフォーム

   - 閲覧者とのコミュニケーション手段の提供

6. SEO 最適化

   - 各ページに適切なメタデータを設定

7. アクセス解析

   - Google Analytics を使用したサイト訪問者の行動分析
   - ページビューのトラッキング
   - カスタムイベントの記録機能

8. プライバシー保護

   - プライバシーポリシーページの提供
   - Cookie 同意バナーの実装

9. RSS フィード
   - 最新の記事更新情報を提供
   - ユーザーが簡単に購読できる機能

## 2. 技術スタックと構成

### 技術スタック

- Next.js 13.4.19 (App Router)
- React 18.2.0
- TypeScript 5.2.2
- Tailwind CSS 3.3.3
- Notion API (@notionhq/client)
- Storybook 7.4.0
- Framer Motion 10.16.5
- next-themes 0.2.1（統一テーマシステム）
- nodemailer 6.9.13
- feed 4.2.2 (RSS フィード生成用)
- @ffmpeg/ffmpeg 0.12.15（動画変換処理用）
- @ffmpeg/util 0.12.2（ffmpeg.wasm ユーティリティ）

### プロジェクト構造

```
src/
├── app/
│   ├── api/
│   │   ├── feed/
│   │   │   └── route.ts
│   │   └── search/
│   │       └── route.ts
│   ├── contact/
│   ├── about/
│   │   └── page.tsx
│   ├── tools/
│   │   ├── char-counter/
│   │   ├── color-picker/
│   │   ├── json-formatter/
│   │   ├── regex-tester/
│   │   ├── text-diff/
│   │   ├── object-formatter/
│   │   ├── qr-generator/
│   │   ├── responsive-tester/
│   │   ├── csv-to-json/
│   │   ├── markdown-to-pdf/
│   │   ├── unix-converter/
│   │   ├── video-to-gif/
│   │   └── page.tsx
│   ├── posts/
│   │   ├── page/
│   │   │   └── [page]/
│   │   │       └── page.tsx
│   │   ├── tag/
│   │   │   └── [tag]/
│   │   │       └── page/
│   │   │           └── [page]/
│   │   │               └── page.tsx
│   │   └── [slug]/
│   │       └── page.tsx
│   ├── privacy-policy/
│   │   └── page.tsx
│   ├── layout.tsx
│   ├── page.tsx
│   └── not-found.tsx
├── components/
│   ├── About/
│   │   ├── Accordion.tsx
│   │   ├── SkillSet.tsx
│   │   └── Timeline.tsx
│   ├── Contact/
│   ├── Footer/
│   ├── Navbar/
│   ├── Search/
│   │   ├── SearchBar.tsx
│   │   ├── SearchResults.tsx
│   │   ├── SearchModal.tsx
│   │   ├── useSearch.ts
│   │   └── index.ts
│   ├── GoogleAnalytics/
│   │   ├── GoogleAnalytics.tsx
│   │   └── CookieConsentBanner.tsx
│   ├── Pagination/
│   ├── Post/
│   ├── TableOfContents/
│   ├── Tags/
│   └── notion/
├── data/
│   └── aboutPageData.ts
├── lib/
│   ├── analytics.ts
│   ├── gtag.ts
│   ├── notionAPI.ts
│   ├── ogp.ts
│   └── generateRssFeed.ts
├── stories/
└── styles/
    └── globals.css
```

### 主要コンポーネント

1. `layout.tsx`: サイト全体のレイアウト
2. `Navbar.tsx`: ナビゲーションバー
3. `Footer.tsx`: フッター（RSS フィードリンクを含む）
4. `Posts.tsx`: 記事一覧表示
5. `SinglePost.tsx`: 個別記事表示
6. `Pagination.tsx`: ページネーション
7. `Tags.tsx`: タグ一覧
8. `ContactForm.tsx`: コンタクトフォーム
9. `TableOfContents.tsx`: 目次
10. `Accordion.tsx`: プロジェクト詳細の折りたたみ表示
11. `SkillSet.tsx`: スキルセットの表示
12. `Timeline.tsx`: 職務経歴のタイムライン表示
13. `GoogleAnalytics.tsx`: Google Analytics の設定と初期化
14. `CookieConsentBanner.tsx`: Cookie 同意バナー

### ページ構成

1. ホームページ (`/`)
2. ブログ記事一覧ページ (`/posts/page/[page]`)
3. タグ別記事一覧ページ (`/posts/tag/[tag]/page/[page]`)
4. 個別記事ページ (`/posts/[slug]`)
5. About ページ (`/about`)
6. コンタクトページ (`/contact`)
7. プライバシーポリシーページ (`/privacy-policy`)
8. ツール集ページ (`/tools`)
9. 各種ツールページ (`/tools/[tool-name]`)
10. 404 ページ
11. RSS フィード (`/api/feed`)

## 3. 開発環境と設定

### 開発環境

- ESLint
- Storybook
- PostCSS

### 設定ファイル

#### next.config.js

- `reactStrictMode: true`
- `experimental.appDir: true`
- 画像ドメインの許可設定

#### tailwind.config.ts

- 統一テーマシステム設定: `darkMode: "class"`
- CSS Variables による動的カラー管理
- テーマ別コンポーネント色の統一管理
- カスタムブレイクポイント: sp (max-width: 640px)

### スクリプト

- `dev`: 開発サーバー起動
- `build`: プロダクションビルド
- `start`: プロダクションサーバー起動
- `lint`: ESLint によるコード検証
- `storybook`: Storybook 開発サーバー起動
- `build-storybook`: Storybook のビルド

## 4. 主要機能とデータフロー

### 主要機能

1. Notion API を使用した記事管理
2. ページネーション
3. タグによる記事フィルタリング
4. 統一テーマシステム対応 (Light、Dark、Terminal Green、Sunset Orange)
5. レスポンシブデザイン
6. コンタクトフォーム (nodemailer)
7. 記事内目次生成 (tocbot)
8. シンタックスハイライト (react-syntax-highlighter)
9. アニメーション (Framer Motion)
10. 自己紹介・経歴紹介（About ページ）
11. SEO 最適化（メタデータの設定）
12. サイトマップの自動生成 (next-sitemap)
13. RSS フィードの生成と提供 (feed)
14. Google Analytics によるアクセス解析
    - ページビューのトラッキング
    - カスタムイベントの記録
15. プライバシーポリシーの提供
16. Cookie 同意バナーの表示と管理

### データフロー

1. `notionAPI.ts`で Notion からデータを取得
2. 各ページコンポーネントで必要なデータを取得・処理
3. 取得したデータを Props としてコンポーネントに渡す
4. コンポーネントでデータをレンダリング
5. About ページのデータは`aboutPageData.ts`から取得
6. `gtag.ts`で Google Analytics のイベントを管理
7. `analytics.ts`で Cookie 同意の確認と Google Analytics Cookie の管理

## 5. パフォーマンスと SEO 最適化

### パフォーマンス最適化

- 静的生成（SSG）の活用
- 画像の最適化 (Next.js Image component)
- コンポーネントの適切な分割
- サイトマップによる効率的なクローリングとインデックス作成の促進
- Google Analytics スクリプトの非同期読み込み

### SEO 最適化

- `layout.tsx`でサイト全体のデフォルトメタデータを設定
- 各ページコンポーネントで、ページ固有のメタデータを設定
- 動的なページでは、`generateMetadata`関数を使用して動的にメタデータを生成
- サイトマップ（sitemap.xml）の自動生成と更新
- robots.txt ファイルの生成とカスタマイズ
- RSS フィードの提供による最新コンテンツの発見性向上

### サイトマップの実装

- `next-sitemap`パッケージを使用して、サイトマップを自動生成
- `next-sitemap.config.js`で詳細な設定を管理
  - ページの優先度（priority）と更新頻度（changefreq）のカスタマイズ
  - 除外する URL の指定
  - robots.txt ファイルの自動生成
- ビルドプロセスの一部としてサイトマップを生成（`postbuild`スクリプト）

### RSS フィードの実装

- `feed`パッケージを使用して RSS フィードを生成
- `generateRssFeed.ts`で最新の記事データを取得し、フィードを構築
- `/api/feed`エンドポイントで RSS フィードを提供
- `Footer.tsx`に RSS フィードへのリンクを追加

## 6. 開発プロセスとバージョン管理

### GitFlow に基づいた開発フロー

1. 新機能開発やバグ修正のためのブランチを作成（feature/** や fix/**）
2. 開発完了後、develop ブランチへプルリクエストを作成
3. コードレビュー後、develop ブランチにマージ
4. 定期的に develop から main へマージしてリリース

### ブランチ戦略

- `main`: 本番環境のコード管理
- `develop`: 開発の主軸、新機能や修正の統合先
- `feature/**`: 新機能の開発用
- `fix/**`: バグ修正用

## 7. デプロイとホスティング

- ホスティング: Vercel
- 継続的デプロイメント: GitHub と Vercel の連携による自動デプロイ

### デプロイプロセス

1. 開発者が GitHub の main ブランチにコードをプッシュまたはマージ
2. GitHub が Vercel に変更を通知
3. Vercel が自動的に新しいビルドを開始し、成功したら新バージョンをデプロイ
4. デプロイされたサイトは自動的に maketech.net ドメインで利用可能になる

## 8. ドメイン管理

### 独自ドメインの導入

- ドメイン名: maketech.net
- 導入時期: 2024/09/23
- ドメインレジストリ: Xserver
- 目的:
  1. ブランドアイデンティティの確立
  2. プロフェッショナリズムの向上
  3. メモリアビリティ（記憶しやすさ）の向上
  4. SEO の潜在的な改善

### ドメイン管理詳細

- ドメインレジストラ: Xserver
- DNS レコードの管理:
  - プライマリ DNS: Xserver の管理画面を通じて設定
  - セカンダリ DNS: Vercel のダッシュボードを通じて設定（Vercel の名前サーバーを使用）
- SSL 証明書: Let's Encrypt を使用し、Vercel が自動的に管理・更新
- リダイレクト: maketech.net から www.maketech.net へのリダイレクトを設定

## 9. プライバシーとデータ保護

### プライバシーポリシー

- プライバシーポリシーページ (`/privacy-policy`) を実装
- 個人情報の取り扱い、Cookie の使用、Google Analytics の利用について説明
- フッターからプライバシーポリシーページへのリンクを提供

### Cookie 同意管理

- `react-cookie-consent`ライブラリを使用して Cookie 同意バナーを実装
- ユーザーに Cookie の使用について同意を求め、選択を保存
- Google Analytics の読み込みと実行を Cookie 同意状態に基づいて制御

## 10. 今後の改善計画

1. テストの導入 (Jest, React Testing Library)
2. エラーハンドリングの強化
3. アクセシビリティの向上
4. パフォーマンスの更なる最適化
5. 検索機能の追加
6. TypeScript の型チェックの強化
7. Storybook を使用したコンポーネントカタログの充実
8. About ページのさらなる改善（アニメーション、インタラクティブ要素の追加）
9. メタデータの継続的な最適化と更新
10. ユーザーエンゲージメント機能の追加（コメント機能、ニュースレター登録など）
11. CI/CD パイプラインの強化（自動テストの導入など）
12. サイトマップの定期的な更新と効果測定
13. ツール機能の拡充（詳細は[MaKeTECH Tools ドキュメント](/docs/tools.md)参照）

## 11. ツール機能

プロジェクト内に実装されたユーティリティツールは、日常的な開発作業や文書作成をサポートします。

### ツールの概要

1. **文字数カウンター**

   - テキストの文字数、単語数、行数をカウント
   - 全角・半角を区別したカウント機能
   - 全角を 2 文字としてカウントするオプション

2. **カラーピッカー**

   - HEX, RGB, HSL 形式のカラーコード変換
   - 色の調整と視覚的な選択機能
   - 補色や類似色の生成

3. **JSON フォーマッター**

   - JSON データの整形と検証
   - ツリービューでの表示
   - JSON パスを使った要素の抽出

4. **正規表現テスター**

   - パターンのリアルタイムテスト
   - マッチング結果のハイライト表示
   - 置換機能

5. **テキスト差分比較（Diff）**

   - 2 つのテキストの差分を視覚的に表示
   - 追加/削除/変更の色分け表示
   - 分割表示と統合表示の切り替え

6. **オブジェクト文字列フォーマッター**

   - Dart/Java/Kotlin などのオブジェクト文字列の整形
   - JSON 形式とツリービュー表示
   - クラス構造の視覚化

7. **QR コードジェネレーター**

   - テキスト、URL、Wi-Fi、連絡先情報などの QR コード生成
   - カスタマイズオプション（サイズ、色、誤り訂正レベル）
   - PNG/SVG 形式でのダウンロード

8. **レスポンシブデザインテスター**

   - 異なるデバイスサイズでの Web サイト表示確認
   - モバイル、タブレット、デスクトップの同時プレビュー
   - カスタムデバイスサイズの追加

9. **CSV to JSON コンバーター**

   - CSV データの JSON 変換
   - ヘッダー設定と型自動検出
   - ファイルアップロード対応

10. **マークダウンから PDF 変換**

    - マークダウンテキストの PDF 変換
    - リアルタイムプレビュー
    - カスタマイズ可能な PDF 設定

11. **UNIX タイムスタンプ変換ツール**

    - UNIX タイムスタンプと日時の相互変換
    - 複数タイムゾーン対応
    - リアルタイム現在時刻表示

12. **動画 →GIF 変換ツール**
    - 動画ファイル（MP4、MOV、WebM）の高品質 GIF 変換
    - ffmpeg.wasm によるブラウザ内処理
    - パレット生成による品質最適化
    - 豊富な変換設定（サイズ、フレームレート、開始時間、長さ）
    - プライバシー保護（ファイル外部送信なし）

詳細な仕様と使用方法については、[MaKeTECH Tools ドキュメント](/docs/tools.md)を参照してください。

### 実装アーキテクチャ

- 各ツールは独立した React コンポーネントとして実装
- クライアントサイドの処理に特化（Next.js のクライアントコンポーネント）
- UI は Tailwind CSS を使用して一貫したデザインを維持
