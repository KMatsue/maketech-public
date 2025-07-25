# MaKeTECH

技術ブログ & ポートフォリオサイト - [maketech.net](https://maketech.net)

## 概要

Notion API を使用した技術ブログサイトです。サイト内検索機能、4 つのテーマを切り替え可能な統一テーマシステム、開発に便利なユーティリティツールを内蔵しています。

## 特徴

🌓 **統一テーマシステム** - Light / Dark / Terminal Green / Sunset Orange  
📝 **Notion CMS** - 記事管理とコンテンツ配信  
🔍 **サイト内検索** - リアルタイム検索、キーボードショートカット (`Ctrl+K`)  
🛠️ **開発ツール集** - 12種類のユーティリティツール（動画→GIF変換、JSON フォーマッター等）  
📱 **レスポンシブ** - マルチデバイス対応  
🎯 **SEO 最適化** - サイトマップ、メタデータ、RSS 対応

## 技術スタック

- Next.js 13 (App Router) + TypeScript
- Tailwind CSS + next-themes
- Notion API + Vercel
- ffmpeg.wasm (WebAssembly動画処理)

## クイックスタート

```bash
git clone https://github.com/[YOUR_USERNAME]/maketech.git
cd maketech
npm install
npm run dev
```

## 環境変数設定

プロジェクトを動作させるには以下の環境変数が必要です：

```bash
# .env.local を作成して以下を設定
NOTION_TOKEN=your_notion_integration_token
NOTION_DATABASE_ID=your_notion_database_id
SITE_URL=https://maketech.net
NEXT_PUBLIC_GA_ID=your_google_analytics_id
```

詳細な設定方法は [プロジェクト概要](./overview.md) を参照してください。

## プロジェクト構造

```
src/
├── app/                    # Next.js App Router
│   ├── api/               # API Routes
│   ├── about/             # About Page
│   ├── contact/           # Contact Page
│   ├── posts/             # Blog Posts
│   ├── privacy-policy/    # Privacy Policy
│   └── tools/             # Utility Tools
├── components/            # React Components
│   ├── About/             # About関連コンポーネント
│   ├── Contact/           # Contact関連コンポーネント
│   ├── Post/              # 記事関連コンポーネント
│   ├── Search/            # 検索機能コンポーネント
│   ├── Tags/              # タグ関連コンポーネント
│   ├── TableOfContents/   # 目次コンポーネント
│   └── notion/            # Notionコンポーネント
├── lib/                   # ユーティリティ関数
├── styles/                # スタイル定義
│   ├── globals.css        # グローバルスタイル
│   └── theme-variables.css # テーマ変数定義
└── data/                  # 静的データ
```

## 詳細なドキュメント

- [プロジェクト概要](./overview.md) - 詳細な技術仕様と機能説明
- [サイト内検索システム](./docs/search-system.md) - 検索機能の仕様と使用方法
- [ツール機能](./docs/tools.md) - 実装されたユーティリティツールの仕様
- [統一テーマシステム](./docs/theme-system.md) - テーマシステムの詳細仕様
