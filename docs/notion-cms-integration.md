# Notion CMS 統合機能

## 概要

MaKeTECH の About ページにおいて、静的データを Notion CMS 管理に移行する機能です。Notion API を使用してデータを動的に取得し、既存の UI コンポーネントと統合します。

## 実装された機能

### 1. 職務経歴 (Careers)

- **データソース**: `About-Careers-DB`
- **コンポーネント**: `Timeline`
- **機能**: 職歴データを時系列で表示

### 2. プロジェクト経歴 (Projects)

- **データソース**: `About-Projects-DB`
- **コンポーネント**: `Accordion`
- **機能**: プロジェクト詳細をアコーディオン形式で表示

### 3. スキルセット (Skills)

- **データソース**: `About-Skills-DB`
- **コンポーネント**: `SkillSet`
- **機能**: カテゴリ別スキル表示、CategoryOrder でソート可能

### 4. 専門分野 (Specialties)

- **データソース**: `About-Specialties-DB`
- **コンポーネント**: `Specialties`
- **機能**: 専門分野を箇条書きで表示

### 5. 趣味・関心事 (Hobbies)

- **データソース**: `About-Hobbies-DB`, `About-HobbiesSummary-DB`
- **コンポーネント**: `Hobbies`
- **機能**: 趣味詳細とサマリーを表示

## ファイル構成

```
src/
├── app/about/
│   └── page.tsx              # Notion版Aboutページ（メイン）
├── app/about_old/
│   └── page.tsx              # 従来の静的データ版（比較用）
├── components/About/
│   ├── Timeline.tsx          # 職務経歴表示
│   ├── Accordion.tsx         # プロジェクト経歴表示
│   ├── SkillSet.tsx          # スキルセット表示
│   ├── Specialties.tsx       # 専門分野表示（新規）
│   └── Hobbies.tsx           # 趣味・関心事表示（新規）
├── lib/
│   └── notionAbout.ts        # Notion API統合ライブラリ
└── data/
    └── aboutPageData.ts      # 従来の静的データ（比較用）
```

## 環境変数設定

```bash
# .env.local
NOTION_TOKEN=your_notion_token
NOTION_CARREERS_DATABASE_ID=your_careers_db_id
NOTION_PROJECTS_DATABASE_ID=your_projects_db_id
NOTION_SKILLS_DATABASE_ID=your_skills_db_id
NOTION_SPECIALTIES_DATABASE_ID=your_specialties_db_id
NOTION_HOBBIES_DATABASE_ID=your_hobbies_db_id
NOTION_HOBBIESSUMMARY_DATABASE_ID=your_hobbies_summary_db_id
```

## Notion データベース構造

### About-Careers-DB

| プロパティ  | タイプ    | 説明               |
| ----------- | --------- | ------------------ |
| Title       | Title     | 職歴タイトル       |
| Description | Rich Text | 職歴説明           |
| Details     | Rich Text | 詳細（改行区切り） |
| StartDate   | Date      | 開始日             |
| EndDate     | Date      | 終了日             |
| SortOrder   | Number    | 表示順序           |

### About-Projects-DB

| プロパティ     | タイプ       | 説明               |
| -------------- | ------------ | ------------------ |
| Title          | Title        | プロジェクト名     |
| Summary        | Rich Text    | プロジェクト概要   |
| Role           | Rich Text    | 担当役割           |
| Description    | Rich Text    | プロジェクト説明   |
| TeamSize       | Rich Text    | チーム規模         |
| Achievements   | Rich Text    | 主な成果           |
| Frontend       | Multi-select | フロントエンド技術 |
| Backend        | Multi-select | バックエンド技術   |
| Database       | Multi-select | データベース技術   |
| Infrastructure | Multi-select | インフラ技術       |
| Other          | Multi-select | その他技術         |
| StartDate      | Date         | 開始日             |
| EndDate        | Date         | 終了日             |
| SortOrder      | Number       | 表示順序           |

### About-Skills-DB

| プロパティ    | タイプ    | 説明             |
| ------------- | --------- | ---------------- |
| Name          | Title     | スキル名         |
| Category      | Select    | カテゴリ         |
| Experience    | Rich Text | 経験年数         |
| CategoryOrder | Number    | カテゴリ表示順序 |
| SortOrder     | Number    | スキル表示順序   |

### About-Specialties-DB

| プロパティ | タイプ | 説明       |
| ---------- | ------ | ---------- |
| Name       | Title  | 専門分野名 |
| SortOrder  | Number | 表示順序   |

### About-Hobbies-DB

| プロパティ  | タイプ    | 説明         |
| ----------- | --------- | ------------ |
| Title       | Title     | 趣味タイトル |
| Description | Rich Text | 趣味説明     |
| SortOrder   | Number    | 表示順序     |

### About-HobbiesSummary-DB

| プロパティ | タイプ | 説明         |
| ---------- | ------ | ------------ |
| Content    | Title  | サマリー内容 |

## API 関数

### `src/lib/notionAbout.ts`

```typescript
// 職務経歴取得
export const getCareersFromNotion = async (): Promise<CareerEvent[]>

// プロジェクト経歴取得
export const getProjectsFromNotion = async (): Promise<ProjectDetail[]>

// スキルセット取得
export const getSkillsFromNotion = async (): Promise<Skill[]>

// 専門分野取得
export const getSpecialtiesFromNotion = async (): Promise<string[]>

// 趣味・関心事取得
export const getHobbiesFromNotion = async (): Promise<HobbyItem[]>

// 趣味・関心事サマリー取得
export const getHobbiesSummaryFromNotion = async (): Promise<string>
```

## パフォーマンス最適化

### 並列 API 呼び出し

```typescript
const [
  careerEvents,
  projectDetails,
  skills,
  specialties,
  hobbies,
  hobbiesSummary,
] = await Promise.all([
  getCareersFromNotion(),
  getProjectsFromNotion(),
  getSkillsFromNotion(),
  getSpecialtiesFromNotion(),
  getHobbiesFromNotion(),
  getHobbiesSummaryFromNotion(),
]);
```

6 つの API 呼び出しを並列実行することで、ページ読み込み時間を大幅に短縮。

## エラーハンドリング

各 API 関数は以下の方針でエラーを処理：

1. **ネットワークエラー**: 空の配列/文字列を返す
2. **データ不整合**: デフォルト値で補完
3. **API エラー**: コンソールにログ出力、フォールバック値を返す
