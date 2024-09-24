# MaKeTECH Overview

## 1. プロジェクト概要

### アプリケーションの目的

このアプリケーションは、個人の技術ブログ兼ポートフォリオサイトとして機能するウェブアプリケーションです。主な目的は以下の通りです。

1. 技術的な学習や経験のアウトプット
2. 個人のスキルセットと経歴の紹介
3. プロジェクト実績の展示
4. 技術コミュニティとの交流促進

### 主な機能

1. ブログ記事の表示と管理

   - Notion API を利用した効率的な記事管理
   - タグによる記事の分類と検索
   - 記事内の目次生成

2. ポートフォリオ機能

   - 経歴やスキルセットの紹介（About ページ）
   - プロジェクト実績の詳細表示

3. ユーザーエクスペリエンス向上機能

   - レスポンシブデザインによるマルチデバイス対応
   - ダークモード対応
   - ページネーションによる効率的な記事ナビゲーション

4. コンタクトフォーム

   - 閲覧者とのコミュニケーション手段の提供

5. SEO 最適化
   - 各ページに適切なメタデータを設定

## 2. 技術スタックと構成

### 技術スタック

- Next.js 13.4.19 (App Router)
- React 18.2.0
- TypeScript 5.2.2
- Tailwind CSS 3.3.3
- Notion API (@notionhq/client)
- Storybook 7.4.0
- Framer Motion 10.16.5
- next-themes 0.2.1
- nodemailer 6.9.13

### プロジェクト構造

```
src/
├── app/
│   ├── api/
│   ├── contact/
│   ├── about/
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
│   ├── Pagination/
│   ├── Post/
│   ├── TableOfContents/
│   ├── Tags/
│   └── notion/
├── data/
│   └── aboutPageData.ts
├── lib/
│   ├── notionAPI.ts
│   └── ogp.ts
├── stories/
└── styles/
    └── globals.css
```

### 主要コンポーネント

1. `layout.tsx`: サイト全体のレイアウト
2. `Navbar.tsx`: ナビゲーションバー
3. `Footer.tsx`: フッター
4. `Posts.tsx`: 記事一覧表示
5. `SinglePost.tsx`: 個別記事表示
6. `Pagination.tsx`: ページネーション
7. `Tags.tsx`: タグ一覧
8. `ContactForm.tsx`: コンタクトフォーム
9. `TableOfContents.tsx`: 目次
10. `Accordion.tsx`: プロジェクト詳細の折りたたみ表示
11. `SkillSet.tsx`: スキルセットの表示
12. `Timeline.tsx`: 職務経歴のタイムライン表示

### ページ構成

1. ホームページ (`/`)
2. ブログ記事一覧ページ (`/posts/page/[page]`)
3. タグ別記事一覧ページ (`/posts/tag/[tag]/page/[page]`)
4. 個別記事ページ (`/posts/[slug]`)
5. About ページ (`/about`)
6. コンタクトページ (`/contact`)
7. 404 ページ

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

- ダークモード設定: `darkMode: "class"`
- カスタムカラー: text, text-dark
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
4. ダークモード対応 (next-themes)
5. レスポンシブデザイン
6. コンタクトフォーム (nodemailer)
7. 記事内目次生成 (tocbot)
8. シンタックスハイライト (react-syntax-highlighter)
9. アニメーション (Framer Motion)
10. 自己紹介・経歴紹介（About ページ）
11. SEO 最適化（メタデータの設定）

### データフロー

1. `notionAPI.ts`で Notion からデータを取得
2. 各ページコンポーネントで必要なデータを取得・処理
3. 取得したデータを Props としてコンポーネントに渡す
4. コンポーネントでデータをレンダリング
5. About ページのデータは`aboutPageData.ts`から取得

## 5. パフォーマンスと SEO 最適化

### パフォーマンス最適化

- 静的生成（SSG）の活用
- 画像の最適化 (Next.js Image component)
- コンポーネントの適切な分割

### SEO 最適化

- `layout.tsx`でサイト全体のデフォルトメタデータを設定
- 各ページコンポーネントで、ページ固有のメタデータを設定
- 動的なページでは、`generateMetadata`関数を使用して動的にメタデータを生成

例: ホームページのメタデータ

```typescript
export const metadata: Metadata = {
  title: "MaKeTECH - Web開発の最新トレンドと技術情報",
  description:
    "Web開発、プログラミング、最新技術トレンドに関する情報を提供するテックブログです。",
  keywords: [
    "Web開発",
    "プログラミング",
    "技術ブログ",
    "ソフトウェアエンジニアリング",
  ],
};
```

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

## 9. 今後の改善計画

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
