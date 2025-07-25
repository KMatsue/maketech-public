# MaKeTECH 開発ガイド

このドキュメントは、MaKeTECH プロジェクトの開発に参加する際のガイドラインと手順を説明します。

## 1. Git ワークフロー

### 1.1 リポジトリ構成

このプロジェクトは、複数のリモートリポジトリを使用した運用を行っています：

```bash
# プライベートリポジトリ（開発用）
origin    git@github.com:KMatsue/maketech.git

# パブリックリポジトリ（公開用）
public    git@github.com:KMatsue/maketech-public.git
```

### 1.2 ブランチ戦略

#### メインブランチ

- **`main`**: 本番環境のコード、開発用ブランチ
- **`develop`**: 開発の統合ブランチ
- **`public`**: 公開用ブランチ

#### 作業ブランチ

- **`feature/*`**: 新機能開発用（例: `feature/search-function`）
- **`fix/*`**: バグ修正用（例: `fix/login-error`）
- **`refactor/*`**: リファクタリング用

### 1.3 開発フロー

#### 通常の開発作業

```bash
# 1. 最新のdevelopブランチから作業ブランチを作成
git checkout develop
git pull origin develop
git checkout -b feature/new-function

# 2. 開発作業
# コード修正、テスト等

# 3. コミット
git add .
git commit -m "feat: 新機能の実装"

# 4. プッシュとプルリクエスト
git push origin feature/new-function
# GitHubでdevelopブランチへのプルリクエストを作成
```

#### 本番リリース

```bash
# developからmainへのマージ
git checkout main
git merge develop
git push origin main
```

### 1.4 公開リポジトリへの反映

公開リポジトリは非公開情報を除いたクリーンな状態で管理されています。

#### 公開用ブランチの更新

```bash
# publicブランチに切り替え
git checkout public

# mainからの変更を取り込み（選択的に）
git merge main
# または手動で必要な変更のみを適用

# 公開リポジトリにプッシュ
git push public public:main
```

#### 注意事項

- 公開ブランチには以下のファイル/ディレクトリは含めない：
  - 個人情報や機密情報を含むファイル
  - 開発メモや内部ドキュメント
  - 認証トークンや API キー

## 2. コントリビューション

### 2.1 コミットメッセージ規約

#### フォーマット

```
<type>: <description>

[optional body]
```

#### Type の種類

- `feat`: 新機能の追加
- `fix`: バグ修正
- `docs`: ドキュメントの変更
- `style`: コードフォーマットの変更（機能変更なし）
- `refactor`: リファクタリング
- `test`: テストの追加・修正
- `chore`: ビルドプロセスやツールの変更

#### 例

```bash
git commit -m "feat: 動画→GIF変換ツールの実装"
git commit -m "fix: 検索機能でのタイムアウトエラーを修正"
git commit -m "docs: 開発ガイドドキュメントを追加"
```

### 2.２ プルリクエスト

#### 作成前のチェックリスト

- [ ] コードが正常に動作することを確認
- [ ] リントエラーがないことを確認（`npm run lint`）
- [ ] 適切なコミットメッセージが記述されている
- [ ] 関連するドキュメントが更新されている

#### プルリクエストのテンプレート

```markdown
## 概要

<!-- 変更内容の概要を記述 -->

## 変更内容

- [ ] 機能 A の実装
- [ ] バグ B の修正
- [ ] ドキュメント C の更新

## テスト

<!-- テスト方法や確認事項を記述 -->

## 関連 Issue

<!-- 関連するIssueがあれば記述 -->
```

## 3. コーディングガイドライン

### 3.1 基本原則

- **統一テーマシステムの活用**: CSS Variables を使用し、ハードコードされた色は使用しない
- **レスポンシブデザイン**: モバイルファーストでの実装
- **アクセシビリティ**: 適切なセマンティック HTML の使用
- **型安全性**: TypeScript の型定義を活用

### 3.2 ファイル構成

```
src/
├── app/                    # Next.js App Router
├── components/             # React コンポーネント
│   ├── [ComponentName]/    # コンポーネント別ディレクトリ
│   │   └── ComponentName.tsx
├── lib/                    # ユーティリティ関数
├── styles/                 # スタイル定義
├── types/                  # 型定義
└── data/                   # 静的データ
```

### 3.3 コンポーネント設計

- 単一責任の原則に従う
- props の型定義を明確にする
- 再利用可能な設計を心がける
- 適切なコメントを記述する

### 3.4 スタイリング

```tsx
// 良い例: CSS Variables の使用
className = "bg-card text-foreground border border-border";

// 悪い例: ハードコードされた色
className = "bg-white text-black border border-gray-300";
```

## 4. テストとリント

### 4.1 必須チェック

開発完了時は以下のコマンドを実行してエラーがないことを確認：

```bash
# リントチェック
npm run lint

# ビルドチェック
npm run build

# 型チェック（TypeScript）
npm run type-check  # 設定されている場合
```

### 4.2 ツール設定

- **ESLint**: コード品質の維持
- **Prettier**: コードフォーマットの統一
- **TypeScript**: 型安全性の確保
