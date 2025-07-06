# 統一テーマシステムガイド

## 概要

統一された CSS Variables システムにより、拡張可能で保守性の高いテーマシステムを実装しています。全ての UI 要素が一貫したテーマ対応を行い、新しいテーマの追加が容易な設計となっています。

## ファイル構成

```
src/
├── styles/
│   ├── theme-variables.css  # 統一テーマシステム（メイン）
│   └── globals.css         # グローバルスタイル + 固定要素
├── components/
│   ├── ThemeSwitch.tsx     # テーマ切り替えコンポーネント
│   └── Providers.tsx       # ThemeProvider設定
├── tailwind.config.ts      # テーマ色のTailwind統合
```

## 実装されているテーマ

### 1. Light Theme（デフォルト）

- **適用条件**: `html:not(.dark):not(.terminal-green):not(.sunset-orange)`
- **背景**: 白系（#ffffff）
- **テキスト**: 暗いグレー系（#0f172a）
- **用途**: 通常の読書・作業用

### 2. Dark Theme

- **適用条件**: `<html class="dark">`
- **背景**: 暗いスレート系（#0f172a）
- **テキスト**: 明るいグレー系（#f8fafc）
- **用途**: 夜間の作業・目に優しい表示

### 3. Sunset Orange Theme

- **適用条件**: `<html class="sunset-orange">`
- **背景**: 暖色系ダーク（#1f1611）
- **テキスト**: 白系（#ffffff）
- **プライマリ色**: 明るいオレンジ（#f97316）
- **特殊効果**: 炎のグロウエフェクト、ラジアルグラデーション
- **用途**: 夕焼けのような温かみのある作業環境

### 4. Terminal Green Theme

- **適用条件**: `<html class="terminal-green">`
- **背景**: 純黒（#000000）
- **テキスト**: ブライトグリーン（#00ff00）
- **特殊効果**: CRT モニター風エフェクト（スキャンライン、フリッカー）
- **用途**: 80 年代レトロ・ノスタルジック体験

## テーマ対応済みの UI 要素

### 🎨 コア要素

- **Typography**: 見出し、本文、ミュートテキスト
- **Backgrounds**: ページ背景、カード背景
- **Borders**: セクション境界線、カード境界線

### 🧭 ナビゲーション

- **Navbar**: 背景色、テキスト色、境界線、ホバー効果
- **Footer**: 背景色、テキスト色、リンクホバー効果

### 📄 コンテンツ要素

- **Cards**: 境界線、ホバー背景色、テキスト色
- **Tags**: 背景色、テキスト色、境界線、ホバー効果
- **Pagination**: 境界線、ホバー背景、アクティブ/非アクティブ状態

### ⚙️ インタラクティブ要素

- **ThemeSwitch**: ボタンホバー、ドロップダウン背景、メニュー項目
- **フォーム要素**: テキスト入力、セレクト、テキストエリア、レンジスライダー
- **ツール関連**: PDF プレビュー、マージン表示、使い方ヒント

## CSS Variables 一覧

### 基本色

```css
--primary              /* プライマリ色 */
--primary-foreground   /* プライマリテキスト色 */
--secondary           /* セカンダリ色 */
--secondary-foreground /* セカンダリテキスト色 */
--background          /* ページ背景色 */
--foreground          /* メインテキスト色 */
--muted              /* ミュート背景色 */
--muted-foreground   /* ミュートテキスト色 */
```

### UI 要素

```css
--card               /* カード背景色 */
--card-foreground    /* カードテキスト色 */
--border             /* 標準境界線色 */
--input              /* 入力フィールド境界線色 */
--accent             /* アクセント背景色 */
--accent-foreground  /* アクセントテキスト色 */
```

### コンポーネント専用色

```css
/* 境界線 */
--border-primary     /* メイン境界線色 */
--border-secondary   /* サブ境界線色 */

/* ナビゲーション */
--navbar-bg          /* ナビバー背景色 */
--navbar-text        /* ナビバーテキスト色 */
--navbar-text-hover  /* ナビバーホバー色 */
--navbar-border      /* ナビバー境界線色 */

/* フッター */
--footer-bg          /* フッター背景色 */
--footer-text        /* フッターテキスト色 */
--footer-text-hover  /* フッターホバー色 */

/* タグ */
--tag-bg             /* タグ背景色 */
--tag-text           /* タグテキスト色 */
--tag-border         /* タグ境界線色 */
--tag-hover-bg       /* タグホバー背景色 */

/* ページネーション */
--pagination-border        /* ページネーション境界線 */
--pagination-hover-bg      /* ページネーションホバー背景 */
--pagination-active-text   /* アクティブページテキスト */
--pagination-inactive-text /* 非アクティブページテキスト */

/* カード */
--card-hover-bg      /* カードホバー背景色 */

/* テーマスイッチ */
--theme-switch-hover-bg        /* ボタンホバー背景 */
--theme-switch-dropdown-bg     /* ドロップダウン背景 */
--theme-switch-dropdown-border /* ドロップダウン境界線 */
--theme-switch-item-hover-bg   /* メニュー項目ホバー */
--theme-switch-item-text       /* メニュー項目テキスト */
--theme-switch-active-bg       /* アクティブ項目背景 */
--theme-switch-active-text     /* アクティブ項目テキスト */
```

## 新しいテーマの追加手順

### 1. CSS Variables 定義

`src/styles/theme-variables.css`に新しいテーマを追加：

```css
.your-theme-name {
  /* 基本色（必須） */
  --primary: #yourcolor !important;
  --primary-foreground: #yourcolor !important;
  --secondary: #yourcolor !important;
  --secondary-foreground: #yourcolor !important;
  --background: #yourcolor !important;
  --foreground: #yourcolor !important;
  --muted: #yourcolor !important;
  --muted-foreground: #yourcolor !important;
  --card: #yourcolor !important;
  --card-foreground: #yourcolor !important;
  --border: #yourcolor !important;
  --input: #yourcolor !important;
  --accent: #yourcolor !important;
  --accent-foreground: #yourcolor !important;
  --destructive: #yourcolor !important;
  --destructive-foreground: #yourcolor !important;
  --ring: #yourcolor !important;

  /* コンポーネント色（必須） */
  --navbar-bg: #yourcolor !important;
  --navbar-text: #yourcolor !important;
  --navbar-text-hover: #yourcolor !important;
  --navbar-border: #yourcolor !important;
  --footer-bg: #yourcolor !important;
  --footer-text: #yourcolor !important;
  --footer-text-hover: #yourcolor !important;
  --border-primary: #yourcolor !important;
  --border-secondary: #yourcolor !important;
  --tag-bg: #yourcolor !important;
  --tag-text: #yourcolor !important;
  --tag-border: #yourcolor !important;
  --tag-hover-bg: #yourcolor !important;
  --pagination-border: #yourcolor !important;
  --pagination-hover-bg: #yourcolor !important;
  --pagination-active-text: #yourcolor !important;
  --pagination-inactive-text: #yourcolor !important;
  --card-hover-bg: #yourcolor !important;
  --theme-switch-hover-bg: #yourcolor !important;
  --theme-switch-dropdown-bg: #yourcolor !important;
  --theme-switch-dropdown-border: #yourcolor !important;
  --theme-switch-item-hover-bg: #yourcolor !important;
  --theme-switch-item-text: #yourcolor !important;
  --theme-switch-active-bg: #yourcolor !important;
  --theme-switch-active-text: #yourcolor !important;
}

/* 特殊効果（オプション） */
.your-theme-name .special-element {
  /* 必要に応じて特殊スタイルを追加 */
}
```

### 2. ThemeSwitch に追加

`src/components/ThemeSwitch.tsx`の`themes`配列に追加：

```tsx
const themes = [
  { name: "light", label: "Light", icon: SunIcon },
  { name: "dark", label: "Dark", icon: MoonIcon },
  { name: "terminal-green", label: "Terminal", icon: ComputerDesktopIcon },
  { name: "your-theme-name", label: "Your Theme", icon: YourIcon },
];
```

### 3. 特殊な切り替え処理（必要な場合）

複雑な特殊効果を持つテーマの場合：

```tsx
// ThemeSwitchの handleThemeChange 内
if (theme === "your-special-theme") {
  setTimeout(() => {
    document.documentElement.classList.remove(
      "dark",
      "terminal-green",
      "your-special-theme",
      "light"
    );
    if (themeName !== "light") {
      document.documentElement.classList.add(themeName);
    }
  }, 50);
}
```

## 設計原則

### 1. 統一性

- **一貫した CSS Variable 名**: 全テーマで同じ変数名を使用
- **明確なネーミング規則**: 用途が分かりやすい変数名
- **Tailwind との統合**: `tailwind.config.ts`でシームレスに使用可能

### 2. 拡張性

- **モジュラー設計**: 新しいテーマの追加が容易
- **後方互換性**: 既存テーマに影響を与えない
- **テンプレート提供**: 新テーマ作成のガイドライン

### 3. 保守性

- **明確な責任分離**: `theme-variables.css`（テーマ）と`globals.css`（固定要素）
- **包括的なドキュメント**: 実装方法と変数一覧
- **コメントによる説明**: コードの可読性

### 4. パフォーマンス

- **CSS Variables 活用**: ランタイムでの高速な色変更
- **最小限の特殊効果**: Terminal Green テーマも軽量化
- **!important の統一使用**: 確実な優先度制御

## globals.css の役割

### テーマ依存要素

- **body 要素**: `var(--background)`, `var(--foreground)`を使用
- **TableOfContents**: `var(--foreground)`でテーマ対応

### 固定色要素（意図的にテーマ非対応）

- **CookieConsent**: 法的要件のため視認性重視の固定デザイン
- **Code blocks**: 開発者の読みやすさのため標準色を維持
- **ArticleFeedback ボタン**: 機能的な色分けのため固定色

### グローバル設定

- **レスポンシブタイポグラフィ**: h1-h3, p タグのサイズ設定
- **レイアウト**: コンテナの最大幅設定

## トラブルシューティング

### テーマが切り替わらない場合

1. **HTML class 属性を確認**: ブラウザ開発者ツールで`<html class="theme-name">`を確認
2. **CSS Variables 読み込み確認**: `theme-variables.css`がインポートされているか確認
3. **Tailwind 設定確認**: `tailwind.config.ts`で新しい色が定義されているか確認

### Terminal Green から他テーマに切り替えできない場合

- ThemeSwitch の`handleThemeChange`で強制クリーンアップ処理が正常に動作しているか確認

### 新しいコンポーネントでテーマが適用されない場合

- Tailwind クラス名で CSS Variables（例：`text-foreground`, `border-border-primary`）を使用しているか確認

## パフォーマンス考慮事項

- CSS Variables はネイティブブラウザサポートで高速
- `!important`の使用は最小限に抑制（テーマ変数のみ）
- Terminal Green の特殊効果は軽量な CSS アニメーションのみ使用

---

このテーマシステムにより、一貫性があり、拡張可能で、保守しやすいデザインシステムが実現されています。
