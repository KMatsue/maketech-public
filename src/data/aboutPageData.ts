export const careerEvents = [
  {
    date: "2021年1月 - 現在",
    title: "アプリケーション受託開発",
    description: "開発者として様々なプロジェクトに携わる",
  },
  {
    date: "2008年4月 - 2020年3月",
    title: "総合電気メーカー",
    description: "製造、品質管理、システム試験を担当",
  },
];

export const skills = [
  {
    category: "プログラミング言語",
    items: ["Python", "JavaScript/TypeScript", "Dart", "PHP", "HTML/CSS"],
  },
  {
    category: "フレームワーク/ライブラリ",
    items: ["Flutter", "React.js", "Django", "Flask"],
  },
  {
    category: "データベース",
    items: ["PostgreSQL", "MySQL", "Firebase Realtime Database"],
  },
  {
    category: "クラウド/インフラ",
    items: [
      "AWS (ECS, VPC, S3, RDS)",
      "Google Cloud Platform (Firebase)",
      "Docker",
    ],
  },
  // {
  //   category: "その他技術",
  //   items: ["YOLO", "OpenCV", "RevenueCat", "Google Maps API"],
  // },
  // 他のスキルカテゴリーも同様に追加
];

export const projectDetails = [
  // {
  //   title: "動画解析アプリ開発",
  //   content: (
  //     <div>
  //       <p>
  //         <strong>期間:</strong> 2024年1月 - 現在
  //       </p>
  //       <p>
  //         <strong>役割:</strong>{" "}
  //         フロントエンド、バックエンド、インフラ構築、動画解析処理実装
  //       </p>
  //       {/* 他のプロジェクト詳細 */}
  //     </div>
  //   ),
  // },
  // 他のプロジェクトも同様に追加
  {
    title: "動画解析アプリ開発",
    period: "2024年1月 - 現在",
    role: "フルスタック開発者、インフラ構築担当",
    description:
      "動画を解析し、人流や車両の動きを分析するアプリケーション。AWSを活用したスケーラブルなインフラ設計と実装。",
    technologies: {
      frontend: ["React.js", "TypeScript", "Tailwind CSS"],
      backend: ["Django", "Python"],
      database: ["PostgreSQL"],
      infrastructure: ["AWS (ECS, VPC, S3, RDS)", "Docker"],
      other: ["YOLO (物体検出)", "OpenCV"],
    },
    teamSize: "開発者2名",
    achievements: [
      // "WebSocketを使ったリアルタイム動画解析機能の実装により、利便性を向上",
      // "AWSを活用したスケーラブルなインフラ設計により、同時接続数を3倍に増加",
      // "カスタムYOLOモデルの導入により、物体検出の精度を20%改善",
    ],
  },
  {
    title: "業務用マッチングアプリ開発（建設業）",
    period: "2022年12月 - 2023年12月",
    role: "モバイルアプリ開発者",
    description:
      "建設業向けの業務用マッチングアプリケーション。Flutter を使用しての開発、Firebase を用いたバックエンド構築、アプリ内課金の実装など。",
    technologies: {
      frontend: ["Flutter", "Dart"],
      backend: ["Firebase"],
      other: ["RevenueCat (アプリ内課金)", "Riverpodを使った状態管理"],
    },
    teamSize: "開発者1名、デザイナー1名",
    achievements: ["アプリの要件定義からリリースまで担当"],
  },
  {
    title: "イベントサイト作成",
    period: "2022年7月  - 2022年12月",
    role: "イベントサイト投稿機能作成",
    description:
      "投稿機能を作成し、既存のWordPressサイトへ連携。WordPressのデータベースへの投稿処理の実装。",
    technologies: {
      frontend: ["HTML/CSS", "JavaScript"],
      backend: ["PHP", "WordPress"],
      database: ["MySQL"],
      infrastructure: ["Docker"],
      other: [],
    },
    teamSize: "開発者1名",
    achievements: [],
  },
  {
    title: "マッチングアプリ開発",
    period: "2021年6月 - 2022年6月",
    role: "モバイルアプリ開発者",
    description:
      "CtoC向けマッチングアプリケーション。Flutter を使用しての開発、Firebase を用いたバックエンド構築、アプリ内課金の実装など。",
    technologies: {
      frontend: ["Flutter", "Dart"],
      backend: ["Firebase"],
      other: ["Google Maps API", "Providerを使った状態管理"],
    },
    teamSize: "開発者2名、デザイナー1名",
    achievements: ["アプリの開発からリリースまで担当"],
  },
  {
    title: "画像解析ツール開発",
    period: "2021年1月 - 2021年7月",
    role: "画像解析処理",
    description: "ディープラーニングを用いた物体検出と画像認識処理の実装。",
    technologies: {
      frontend: [],
      backend: ["Python", "Pytorch"],
      other: ["YOLO (物体検出)", "OpenCV"],
    },
    teamSize: "開発者2名",
    achievements: [],
  },
];

export const specialties = [
  "モバイルアプリ開発 (Flutter)",
  "Webアプリケーション開発 (フロントエンド・バックエンド)",
  "クラウドネイティブアプリケーション開発 (AWS, GCP)",
  "画像・動画解析システム開発",
  // 他の専門分野
];

export const strengths = [
  "フルスタック開発能力",
  "クラウドインフラ設計と実装の経験",
  "ハードウェアとソフトウェアの両方の知識を活かした開発",
  "新技術の迅速な習得と実践的な適用",
  "プロジェクト全体を俯瞰した効率的な開発管理",

  // 他の強み
];

export const valuePropositions = [
  "包括的なシステム設計能力",
  "品質とスケーラビリティの両立",
  "複雑なシステムの統合能力",
  "技術と業務のブリッジング",
  "イノベーションと安定性の調和",
];
