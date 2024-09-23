export const careerEvents = [
  {
    date: "2021年1月 - 現在",
    title: "ITシステム開発企業勤務",
    description: "開発者として様々なプロジェクトに携わる",
  },
  {
    date: "2008年4月 - 2020年3月",
    title: "総合電気メーカー勤務",
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
    items: ["PostgreSQL", "MySQL", "Firebase Database"],
  },
  {
    category: "クラウド/インフラ",
    items: [
      "AWS (ECS, VPC, S3, RDS)",
      "Google Cloud Platform (Firebase)",
      "Docker",
    ],
  },
  {
    category: "その他技術",
    items: ["Git", "GitHub"],
  },
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
    role: "アプリ開発、インフラ構築担当",
    description:
      "動画を解析し、人流や車両の動きを分析するアプリケーション。IPカメラを使った動画解析によるリアルタイム解析を実装。",
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
    role: "モバイルアプリ開発(Android/iOS)",
    description:
      "建設業向けの業務用マッチングアプリケーション。サブスクリプション及び管理者による認証制のアプリ。Flutter を使用して開発。ログイン認証やストレージなどはFirebaseで構築。アプリ内課金の実装など。",
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
    role: "モバイルアプリ開発(Android/iOS)",
    description:
      "CtoC向けマッチングアプリケーション。Flutterを使用した開発。Firebase を用いたバックエンド構築。アプリ内課金(消耗型)の実装など。MVVMアーキテクチャで実装。",
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
      backend: ["Python", "PyTorch"],
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
];

export const strengthsAndValueProps = [
  {
    title: "ユーザー目線の品質重視アプローチ",
    description:
      "製造業での経験を活かし、ユーザーニーズを考慮したソフトウェア開発に取り組みます。信頼性と実用性のバランスを意識し、エンドユーザーの満足度向上を目指したソリューションを提供します。",
  },
  {
    title: "多角的な開発アプローチと継続的学習",
    description:
      "フロントエンド、バックエンド、モバイルアプリ開発まで幅広い開発経験があります。新しい技術やツールの学習に積極的で、プロジェクトに適した技術の選定と適用に努めています。",
  },
  {
    title: "スケーラビリティを考慮したシステム設計",
    description:
      "クラウドインフラ技術の知識を活かし、拡張性のあるシステムの設計・実装に取り組んでいます。ただし、過度な複雑化を避け、現在の要件とのバランスを取ることも重要だと考えています。",
  },
  {
    title: "プロジェクト全体を見据えた開発への参画",
    description:
      "大規模システム開発での製造、試験、品質管理の経験を活かし、プロジェクト全体の成功を目指しています。部分最適化ではなく、全体を俯瞰しながら個々の開発タスクに取り組みます。チームメンバーとの密なコミュニケーションを通じて、常に進捗と品質のバランスを保ち、プロジェクト全体の最適化に貢献します。",
  },
];

export const hobbiesAndInterests = [
  {
    title: "ランニング",
    description:
      "ランニングが日課です。毎日がハイペースというわけではなく、時には歩いたり、ゆっくりジョギングしたりします。早朝や夕方に走ることで、心身ともにリフレッシュでき、一日の良いスタートや締めくくりになっています。風景の移り変わりを感じながら走るのが好きで、その時々の景色を楽しんでいます。",
  },
  {
    title: "書店巡り",
    description:
      "休日には書店を巡るのが楽しみです。技術書コーナーをのぞいてみたり、普段あまり関わりのない分野の本棚を見て回ったりするのが好きです。大型の書店だと全ての棚を徘徊してしまい、つい長居してしまうこともあります。新しい本の匂いや、本に囲まれた空間が心地よく感じます。",
  },
];

export const hobbiesSummary =
  "これらの趣味を通じて、日々の生活に小さな楽しみや発見を見出しています。体を動かすことと本に触れることのバランスが、私の日々の活力源になっています。";
