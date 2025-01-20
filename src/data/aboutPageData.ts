export const careerEvents = [
  {
    date: "2021年1月 - 現在",
    title: "ITシステム開発企業勤務",
    description: "モバイルアプリからWebシステムまで幅広い開発に従事",
    details: [
      "モバイルアプリケーション開発 (Flutter)",
      "Webアプリケーション開発 (React.js, Django)",
      "クラウドインフラ構築 (AWS, Firebase)",
      "画像・動画解析システム開発",
      "小規模チームでの要件定義からリリースまでの一貫した開発経験",
    ],
  },
  {
    date: "2008年4月 - 2020年3月",
    title: "総合電気メーカー勤務",
    description:
      "製造部門で12年間、製品の製造・試験に携わり、品質管理の重要性とエンドユーザーを意識した製品づくりを実践",
    details: [
      "通信機器・電波応用機器の製造、試験、保守を担当",
      "Linux環境でのサーバー管理、ネットワーク構築などのIT業務も一部担当",
      "品質管理プロセスの改善と標準化をリード",
      "グループ員へのOJTや新人教育を担当",
    ],
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
  {
    title: "業務用マッチングアプリ開発（建設業） - 機能追加フェーズ",
    period: "2024年11月 - 2024年12月",
    role: "モバイルアプリ開発(Android/iOS)",
    description:
      "建設業向けの特化型マッチングアプリケーションの機能追加開発。発生土の受け入れ先と盛土が必要な現場をマッチングし、建設現場の効率を向上させるツール。\n 既存アプリのユーザビリティ向上や新機能追加を担当。",
    technologies: {
      frontend: [
        "Flutter",
        "Dart",
        "Riverpod (状態管理)",
        "GoRouter (ナビゲーション)",
      ],
      backend: [
        "Firebase ",
        "Firebase Authentication",
        "Cloud Firestore",
        "Cloud Storage",
        "Cloud Functions",
        "Cloud Messaging",
        "Remote Config",
      ],
      other: [
        "RevenueCat (アプリ内課金)",
        "Flutter Hooks",
        "Freezed (コード生成)",
        "Intl (多言語化)",
      ],
    },
    teamSize: "開発者1名",
    achievements: [
      "ユーザーフィードバックに基づく機能改善と新機能の実装",
      "アプリのパフォーマンス最適化とユーザビリティの向上",
      "既存機能の改善と拡張",
    ],
  },
  {
    title: "動画解析アプリ開発",
    period: "2024年1月 - 現在",
    role: "アプリ開発, インフラ構築担当, 動画解析処理実装",
    description:
      "動画やリアルタイムストリームから人流や車両の動きを分析するアプリケーションの開発。\n主な機能には、アップロード動画の解析、IPカメラを使用したリアルタイムストリーミング解析、検出された人物の属性分析（性別、年齢範囲）が含まれる。",
    technologies: {
      frontend: ["React.js", "TypeScript", "Tailwind CSS"],
      backend: ["Django", "Python"],
      database: ["PostgreSQL", "Redis"],
      infrastructure: [
        "Amazon ECS",
        "Amazon VPC",
        "Amazon S3",
        "Amazon RDS",
        "CloudFront",
        "CloudFormation",
        "Fargate",
        "Docker",
      ],
      other: ["YOLO (物体検出)", "OpenCV", "JWT認証"],
    },
    teamSize: "開発者2名",
    achievements: [
      "WebSocketを使用したリアルタイム動画解析機能の実装により、\nユーザー体験を向上",
      "AWSのECSとFargateを活用したスケーラブルなインフラ設計により、\n将来の成長に備えた拡張性を確保",
      "YOLOv8とAmazon Rekognitionを組み合わせた物体検出と属性分析機能の実現",
    ],
  },
  {
    title: "業務用マッチングアプリ開発（建設業）- 初期開発フェーズ",
    period: "2022年12月 - 2023年12月",
    role: "モバイルアプリ開発(Android/iOS)",
    description:
      "建設業向けの特化型マッチングアプリケーションの開発。建設発生土を処分したい業者と発生土が必要な現場をマッチングし、建設現場の効率を向上させるツール。\nFlutter を使用してクロスプラットフォーム開発を行い、Firebase でバックエンドを構築。",
    technologies: {
      frontend: [
        "Flutter",
        "Dart",
        "Riverpod (状態管理)",
        "GoRouter (ナビゲーション)",
      ],
      backend: [
        "Firebase ",
        "Firebase Authentication",
        "Cloud Firestore",
        "Cloud Storage",
        "Cloud Functions",
        "Cloud Messaging",
        "Remote Config",
      ],
      other: [
        "RevenueCat (アプリ内課金)",
        "Flutter Hooks",
        "Freezed (コード生成)",
        "Intl (多言語化)",
      ],
    },
    teamSize: "開発者1名、デザイナー1名",
    achievements: [
      "Flutterを活用し、単一のコードベースでAndroidとiOSの両プラットフォームに対応",
      "Firebaseの各種サービスを統合し、認証、データベース、ストレージ、メッセージングを含むバックエンドソリューションを構築",
      "RevenueCatを連携させ、サブスクリプション管理と収益化を効率的に実装",
      "Riverpodを用いた状態管理とgo_routerによるナビゲーション設計で、保守性の高いアーキテクチャを実現",
      "Flutter Hooksとfreezedを活用し、ボイラープレートコードを削減しつつ、型安全性を確保",
      "多言語対応とプッシュ通知機能の実装により、ユーザー体験を向上",
      "アプリの要件定義からApp StoreとGoogle Play Storeへのリリースまでを担当",
    ],
  },
  {
    title: "イベントサイト作成",
    period: "2022年7月  - 2022年12月",
    role: "イベントサイト投稿機能作成",
    description:
      "既存のWordPressサイトに統合する形で、新たなイベント投稿機能を実装。WordPressデータベースとの連携も実装",
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
    title: "CtoC向けマッチングアプリ開発",
    period: "2021年6月 - 2022年6月",
    role: "モバイルアプリ開発(Android/iOS)",
    description:
      "位置情報と地図機能を活用したCtoC向けマッチングアプリケーションの開発。ユーザー間のイベント作成、検索、申し込み機能や、メッセージング、評価システムなどを実装。",
    technologies: {
      frontend: [
        "Flutter",
        "Dart",
        "Provider (状態管理)",
        "MVVM (アーキテクチャパターン)",
      ],
      backend: [
        "Firebase ",
        "Firebase Authentication",
        "Cloud Firestore",
        "Cloud Storage",
        "Cloud Functions",
        "Cloud Messaging",
        "Dynamic Links",
        "In-App Messaging",
        "Remote Config",
      ],
      other: [
        "Google Maps API",
        "Geolocator & Geocoding",
        "In-App Purchase",
        "Google Sign-In",
        "Sign In with Apple",
        "Image Picker & Cropper",
      ],
    },
    teamSize: "開発者2名、デザイナー1名",
    achievements: [
      "MVVMアーキテクチャを採用し、コードの保守性と再利用性を向上",
      "Flutterを活用し、単一のコードベースでAndroidとiOSの両プラットフォームに対応したアプリを開発",
      "Firebaseの各種サービスを統合し、認証、データベース、ストレージ、プッシュ通知を含むバックエンドを構築",
      "Google Maps APIと位置情報サービスを統合し、ユーザーの位置に基づいたイベント検索と表示機能を実装",
      "In-App Purchaseを使用したアプリ内課金(消耗型)を導入し、収益化を実現",
      "画像のアップロードと編集機能を実装し、ユーザープロフィールやイベント情報の視覚的な印象を向上",

      "アプリの要件定義からApp StoreとGoogle Play Storeへのリリースまでを担当",
    ],
  },
  {
    title: "画像解析ツール開発",
    period: "2021年1月 - 2021年7月",
    role: "画像解析処理",
    description:
      "ディープラーニングを用いた物体検出と画像認識処理の実装。検出対象の画像アノテーション、データ拡張技術を用いた学習データセットの強化、モデルの学習と最適化を担当。",
    technologies: {
      frontend: [],
      backend: ["Python", "PyTorch"],
      other: ["YOLO (物体検出)", "OpenCV"],
    },
    teamSize: "開発者2名",
    achievements: [
      "検出対象の画像を自らアノテーションし、学習データセットを作成",
      "データ拡張技術（画像の回転、色調変更など）を実装し、学習データの多様性と量を向上",
      "YOLOアルゴリズムを用いた物体検出モデルの学習と推論を実施",
    ],
  },
];

export const specialties = [
  "モバイルアプリ開発 (Flutter)",
  "Webアプリケーション開発 (フロントエンド・バックエンド)",
  // "クラウドネイティブアプリケーション開発 (AWS, GCP)",
  "画像・動画解析システム開発",
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
      "大規模システム開発での製造、試験、品質管理の経験を活かし、プロジェクト全体の成功を目指しています。\n部分最適化ではなく、全体を俯瞰しながら個々の開発タスクに取り組みます。チームメンバーとの密なコミュニケーションを通じて、常に進捗と品質のバランスを保ち、プロジェクト全体の最適化を目指します。",
  },
];

export const hobbiesAndInterests = [
  // {
  //   title: "ランニング",
  //   description:
  //     "ランニングが日課です。毎日がハイペースというわけではなく、時には歩いたり、ゆっくりジョギングしたりします。早朝や夕方に走ることで、心身ともにリフレッシュでき、一日の良いスタートや締めくくりになっています。風景の移り変わりを感じながら走るのが好きで、その時々の景色を楽しんでいます。",
  // },
  // {
  //   title: "書店巡り",
  //   description:
  //     "休日には書店を巡るのが楽しみです。技術書コーナーをのぞいてみたり、普段あまり関わりのない分野の本棚を見て回ったりするのが好きです。大型の書店だと全ての棚を徘徊してしまい、つい長居してしまうこともあります。新しい本の匂いや、本に囲まれた空間が心地よく感じます。",
  // },
  {
    title: "ランニング",
    description:
      // "ランニングが日課です。毎日がハイペースというわけではなく、時には歩いたり、ゆっくりジョギングしたりします。風景の移り変わりを感じながら走るのが好きで、その時々の景色を楽しんでいます。",
      "ランニングが日課です。風景の移り変わりを感じながら走るのが好きで、その時々の景色を楽しんでいます。",
  },
  {
    title: "書店巡り",
    description:
      "休日は書店を巡るのが楽しみです。技術書コーナーをのぞいてみたり、普段あまり関わりのない分野の本棚を見て回ったりするのが好きです。大型の書店だと全ての棚を徘徊してしまい、つい長居してしまうこともあります。",
  },
];

export const hobbiesSummary =
  // "これらの趣味を通じて、日々の生活に小さな楽しみや発見を見出しています。体を動かすことと本に触れることのバランスが、私の日々の活力源になっています。";
  "これらの趣味を通じて、日々の生活に小さな楽しみや発見を見出しています。";
