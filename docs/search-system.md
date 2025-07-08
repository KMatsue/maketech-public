# サイト内検索システム仕様書

## 1. 概要

### 機能の目的

MaKeTECH のサイト内検索機能は、ユーザーがブログ記事と開発ツールを効率的に発見できるようにすることを目的としています。リアルタイム検索、キーボードショートカット、統合検索により、サイトの利便性と価値を向上させます。

### 主な特徴

- **リアルタイム検索**: 入力と同時に結果を表示
- **キーボードショートカット**: `Ctrl+K` / `Cmd+K` でワンタッチアクセス
- **統合検索**: ブログ記事と開発ツール 10 種を同時検索
- **ハイライト表示**: 検索語を結果内で強調表示
- **レスポンシブ対応**: デスクトップ・モバイル両対応
- **テーマ対応**: 4 テーマ（Light/Dark/Terminal Green/Sunset Orange）に完全対応

## 2. ユーザー向け使用方法

### アクセス方法

#### 1. 検索アイコンをクリック

- ナビゲーションバーの 🔍 アイコンをクリック
- デスクトップ・モバイル両方で利用可能

#### 2. キーボードショートカット

- **Windows**: `Ctrl + K`
- **Mac**: `Cmd + K`
- サイトのどのページからでも利用可能

### 検索操作

1. 検索モーダルが開いたら、検索バーに検索語を入力
2. 入力と同時にリアルタイムで結果が表示される
3. 結果は「記事」と「開発ツール」のカテゴリ別に表示
4. 検索語は黄色でハイライト表示される
5. 結果をクリックして該当ページに移動

### 検索のコツ

- **記事検索**: タイトル、説明、タグで検索
- **ツール検索**: ツール名、説明、キーワードで検索
- **部分一致**: 完全一致でなくても検索可能
- **大文字小文字**: 区別されません

## 3. 技術仕様

### アーキテクチャ概要

```
検索機能
├── API Route (/api/search)     # バックエンド検索処理
├── カスタムフック (useSearch)  # 検索ロジック
├── UI コンポーネント
│   ├── SearchBar              # 検索入力
│   ├── SearchResults          # 結果表示
│   └── SearchModal            # モーダルUI
└── Navbar統合                 # グローバルアクセス
```

### 技術スタック

- **Frontend**: React 18, TypeScript, Tailwind CSS
- **Backend**: Next.js 13 API Routes
- **データソース**: Notion API (記事), 静的データ (ツール)
- **状態管理**: React Hooks, カスタムフック

## 4. API 仕様

### エンドポイント

```
GET /api/search?q={query}
```

### リクエスト仕様

| パラメータ | 型     | 必須 | 説明       |
| ---------- | ------ | ---- | ---------- |
| q          | string | ✅   | 検索クエリ |

### レスポンス仕様

```typescript
interface SearchResponse {
  query: string; // 検索クエリ
  results: SearchResult[]; // 検索結果配列
  total: number; // 結果総数
  timestamp: string; // 検索実行時刻
}

interface SearchResult {
  id: string; // 一意識別子
  title: string; // タイトル
  description: string; // 説明
  slug: string; // URL slug
  type: "post" | "tool"; // コンテンツタイプ
  tags?: string[]; // タグ (記事のみ)
  keywords?: string[]; // キーワード (ツールのみ)
  date?: string; // 投稿日 (記事のみ)
  relevanceScore: number; // 関連度スコア
}
```

### エラーレスポンス

```typescript
// 400 Bad Request
{
  error: "検索クエリが必要です";
}

// 500 Internal Server Error
{
  error: "検索中にエラーが発生しました";
}
```

## 5. コンポーネント仕様

### SearchBar

```typescript
interface SearchBarProps {
  onSearch: (query: string) => void;
  onFocus?: () => void;
  onBlur?: () => void;
  placeholder?: string;
  className?: string;
  showHint?: boolean; // ヒント表示フラグ
}
```

**主な機能:**

- リアルタイム検索入力
- キーボードショートカット表示 (⌘K)
- クリアボタン
- フォーカス時ヒント表示

### SearchResults

```typescript
interface SearchResultsProps {
  results: SearchResult[];
  query: string;
  isLoading?: boolean;
  onResultClick?: (result: SearchResult) => void;
}
```

**主な機能:**

- カテゴリ別結果表示
- 検索語ハイライト
- ローディング状態表示
- 結果なし時のメッセージ

### SearchModal

```typescript
interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}
```

**主な機能:**

- フルスクリーンモーダル
- モーダル外クリックで閉じる
- Esc キーで閉じる
- レスポンシブ対応

### useSearch カスタムフック

```typescript
interface UseSearchOptions {
  debounceMs?: number; // デバウンス時間 (デフォルト: 300)
  minQueryLength?: number; // 最小検索文字数 (デフォルト: 1)
}

interface UseSearchReturn {
  query: string;
  results: SearchResult[];
  isLoading: boolean;
  error: string | null;
  total: number;
  search: (query: string) => void;
  clearSearch: () => void;
}
```

## 6. 検索アルゴリズム

### 関連度スコア計算

検索結果は以下の基準でスコア付けされ、降順で表示されます：

| マッチ箇所           | スコア |
| -------------------- | ------ |
| タイトル完全一致     | 100    |
| タイトル部分一致     | 50     |
| 説明文一致           | 20     |
| タグ・キーワード一致 | 15     |

### 検索対象データ

#### ブログ記事

- **データソース**: Notion API
- **検索対象**: タイトル、説明、タグ
- **フィルタ**: `published: true` の記事のみ

#### 開発ツール (10 種)

- **データソース**: 静的データ
- **検索対象**: タイトル、説明、キーワード
- **ツール一覧**:
  1. JSON フォーマッター
  2. 正規表現テスター
  3. Markdown to PDF
  4. カラーピッカー
  5. 文字数カウンター
  6. CSV to JSON 変換
  7. QR コード生成
  8. テキスト差分比較
  9. オブジェクトフォーマッター
  10. レスポンシブテスター

## 7. パフォーマンス最適化

### デバウンス処理

- **デフォルト**: 300ms
- **目的**: 過度な API 呼び出しの防止
- **実装**: useSearch カスタムフック内

### 結果制限

- **最大件数**: 20 件
- **目的**: レスポンス速度の維持
- **ソート**: 関連度スコア降順

### キャッシュ戦略

- **フロントエンド**: なし（リアルタイム性重視）
- **バックエンド**: Notion API レスポンスのキャッシュ（Next.js 標準）

## 8. カスタマイズガイド

### 検索対象の追加

新しいコンテンツタイプを追加する場合：

1. **API ルートの修正** (`src/app/api/search/route.ts`)

```typescript
// 新しいデータソースを追加
const NEW_CONTENT_DATA = [...];

// searchContent関数内で統合
const allContent = [
  ...posts.map(post => ({...post, type: "post"})),
  ...TOOLS_DATA,
  ...NEW_CONTENT_DATA.map(item => ({...item, type: "new_type"}))
];
```

2. **型定義の拡張**

```typescript
type ContentType = "post" | "tool" | "new_type";
```

3. **結果表示の対応** (`SearchResults.tsx`)

```typescript
// 新しいタイプの表示ロジック追加
{
  groupedResults.new_type && (
    <section>
      <h3>新しいコンテンツ ({groupedResults.new_type.length}件)</h3>
      {/* 表示ロジック */}
    </section>
  );
}
```

### スタイルのカスタマイズ

検索機能は統一テーマシステムに対応しているため、テーマ変数を変更することで外観をカスタマイズできます：

```css
/* theme-variables.css */
:root {
  --search-highlight-bg: #fef3c7; /* ハイライト背景色 */
  --search-highlight-text: #92400e; /* ハイライト文字色 */
}
```

### 検索精度の調整

関連度スコアの重み付けを変更する場合：

```typescript
// calculateRelevanceScore関数内
if (item.title.toLowerCase() === lowerQuery) {
  score += 150; // タイトル完全一致の重みを調整
}
```

## 9. トラブルシューティング

### よくある問題

#### 検索結果が表示されない

**原因と対処法:**

1. **Notion API 接続エラー**

   - 環境変数 `NOTION_TOKEN` の確認
   - Notion データベース権限の確認

2. **JavaScript 無効**
   - ブラウザの JavaScript 設定確認
   - コンソールエラーの確認

#### キーボードショートカットが動作しない

**原因と対処法:**

1. **他のアプリケーションとの競合**

   - ブラウザ拡張機能の無効化
   - OS レベルのショートカット確認

2. **フォーカス状態の問題**
   - ページの完全読み込み待機
   - 入力フィールドからのフォーカス移動

#### 検索が遅い

**原因と対処法:**

1. **ネットワーク遅延**

   - 接続状況の確認
   - デバウンス時間の調整

2. **大量データ**
   - 結果制限数の調整
   - ページング実装の検討

### ログ確認

開発環境でのデバッグ：

```bash
# API呼び出しの確認
curl "http://localhost:3000/api/search?q=test"

# ログの確認
console.log("Search API Response:", response);
```

## 10. 今後の拡張予定

### Phase 1: 基本機能拡張

- [ ] 検索履歴機能
- [ ] フィルタ機能（日付範囲、カテゴリ）
- [ ] 検索候補表示

### Phase 2: 高度な検索

- [ ] 正規表現検索
- [ ] 複合条件検索
- [ ] 全文検索対応

### Phase 3: 分析機能

- [ ] 検索分析ダッシュボード
- [ ] 人気検索キーワード
- [ ] 検索結果クリック率分析

### Phase 4: パフォーマンス向上

- [ ] 検索インデックス最適化
- [ ] Redis キャッシュ導入
- [ ] CDN 活用

---

## 関連ドキュメント

- [統一テーマシステム](./theme-system.md)
- [開発ツール仕様](./tools.md)
- [お問い合わせフォーム設計](./contact-form-design.md)

## 更新履歴

- 2024-01-XX: 初版作成
- 2024-01-XX: 検索アルゴリズム詳細追加
