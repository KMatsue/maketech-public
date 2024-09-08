# MaKe TECH Blog Overview

## プロジェクト構造

src/
├── app/
│ ├── api/
│ ├── contact/
│ ├── posts/
│ │ ├── [slug]/
│ │ ├── page/
│ │ │ └── [page]/
│ │ └── tag/
│ │ └── [tag]/
│ │ └── page/
│ │ └── [page]/
│ ├── layout.tsx
│ ├── page.tsx
│ └── not-found.tsx
├── components/
│ ├── Contact/
│ ├── Footer/
│ ├── Navbar/
│ ├── Pagination/
│ ├── Post/
│ ├── TableOfContents/
│ ├── Tags/
│ └── notion/
├── lib/
│ ├── notionAPI.ts
│ └── ogp.ts
├── stories/
└── styles/
└── globals.css

## 技術スタック

- Next.js 13.4.19 (App Router)
- React 18.2.0
- TypeScript 5.2.2
- Tailwind CSS 3.3.3
- Notion API (@notionhq/client)
- Storybook 7.4.0
- Framer Motion 10.16.5
- next-themes 0.2.1
- nodemailer 6.9.13

## 主要コンポーネント

1. `layout.tsx`: サイト全体のレイアウト
2. `Navbar.tsx`: ナビゲーションバー
3. `Footer.tsx`: フッター
4. `Posts.tsx`: 記事一覧表示
5. `SinglePost.tsx`: 個別記事表示
6. `Pagination.tsx`: ページネーション
7. `Tags.tsx`: タグ一覧
8. `ContactForm.tsx`: コンタクトフォーム
9. `TableOfContents.tsx`: 目次

## ページ構成

1. ホームページ (`/`)
2. ブログ記事一覧 (`/posts/page/[page]`)
3. 個別記事ページ (`/posts/[slug]`)
4. タグ別記事一覧 (`/posts/tag/[tag]/page/[page]`)
5. コンタクトページ (`/contact`)

## 主要機能

1. Notion API を使用した記事管理
2. ページネーション
3. タグによる記事フィルタリング
4. ダークモード対応 (next-themes)
5. レスポンシブデザイン
6. コンタクトフォーム (nodemailer)
7. 記事内目次生成 (tocbot)
8. シンタックスハイライト (react-syntax-highlighter)
9. アニメーション (Framer Motion)

## データフロー

1. `notionAPI.ts`で Notion からデータを取得
2. 各ページコンポーネントで必要なデータを取得・処理
3. 取得したデータを Props としてコンポーネントに渡す
4. コンポーネントでデータをレンダリング

## SEO 対策

- 動的 OGP 生成 (ogp-parser)
- メタデータの適切な設定

## パフォーマンス最適化

- 静的生成（SSG）の活用
- 画像の最適化 (Next.js Image component)
- コンポーネントの適切な分割

## 開発環境

- ESLint
- Storybook
- PostCSS

## 設定ファイル

### next.config.js

- `reactStrictMode: true`
- `experimental.appDir: true`
- 画像ドメインの許可設定

### tailwind.config.ts

- ダークモード設定: `darkMode: "class"`
- カスタムカラー: text, text-dark
- カスタムブレイクポイント: sp (max-width: 640px)

## スクリプト

- `dev`: 開発サーバー起動
- `build`: プロダクションビルド
- `start`: プロダクションサーバー起動
- `lint`: ESLint によるコード検証
- `storybook`: Storybook 開発サーバー起動
- `build-storybook`: Storybook のビルド

## 今後の改善点

1. テストの導入 (Jest, React Testing Library)
2. エラーハンドリングの強化
3. アクセシビリティの向上
4. パフォーマンスの更なる最適化
5. 検索機能の追加
6. TypeScript の型チェックの強化
7. Storybook を使用したコンポーネントカタログの充実
