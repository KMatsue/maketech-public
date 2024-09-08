import Accordion from "@/components/About/Accodion";
import SkillSet from "@/components/About/SkillSet";
import Timeline from "@/components/About/Timeline";
import React from "react";

const careerEvents = [
  {
    date: "2021年1月 - 現在",
    title: "IT受託開発",
    description: "開発者として様々なプロジェクトに携わる",
  },
  {
    date: "2008年4月 - 2020年3月",
    title: "総合電気メーカー",
    description: "製造、品質管理、システム試験を担当",
  },
];

const skills = [
  {
    category: "プログラミング言語",
    items: ["Python", "JavaScript/TypeScript", "Dart", "PHP", "HTML/CSS"],
  },
  {
    category: "フレームワーク/ライブラリ",
    items: ["Flutter", "React.js", "Django", "Flask"],
  },
  // 他のスキルカテゴリーも同様に追加
];

const projectDetails = [
  {
    title: "動画解析アプリ開発",
    content: (
      <div>
        <p>
          <strong>期間:</strong> 2024年1月 - 現在
        </p>
        <p>
          <strong>役割:</strong>{" "}
          フロントエンド、バックエンド、インフラ構築、動画解析処理実装
        </p>
        {/* 他のプロジェクト詳細 */}
      </div>
    ),
  },
  // 他のプロジェクトも同様に追加
];

const specialties = [
  "モバイルアプリ開発 (Flutter)",
  "Webアプリケーション開発 (フロントエンド・バックエンド)",
  "クラウドネイティブアプリケーション開発 (AWS, GCP)",
  // 他の専門分野
];

const strengths = [
  "フルスタック開発能力",
  "クラウドインフラ設計と実装の経験",
  "ハードウェアとソフトウェアの両方の知識を活かした開発",
  // 他の強み
];

const valuePropositions = [
  "包括的なシステム設計能力",
  "品質とスケーラビリティの両立",
  "複雑なシステムの統合能力",
  "技術と業務のブリッジング",
  "イノベーションと安定性の調和",
];

const AboutPage = () => {
  return (
    <main className="container mx-auto w-full mt-14 px-4 md:px-8 lg:px-16">
      <div className="mx-auto lg:w-9/12">
        <header className="text-center my-8">
          <h1 className="text-4xl font-bold mb-4">About Me</h1>
          <p className="text-lg text-gray-700 dark:text-gray-300">
            ハードウェア製造からクラウドネイティブ開発まで、幅広い経験を持つアプリ開発者
          </p>
        </header>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">職務経歴</h2>
          <Timeline events={careerEvents} />
        </section>
        {/* 必要に応じて、スキルセット、経歴、プロジェクトなどのセクションを追加できます */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">スキルセット</h2>
          <SkillSet skills={skills} />
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">プロジェクト詳細</h2>
          <Accordion items={projectDetails} />
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">専門分野</h2>
          <ul className="list-disc list-inside">
            {specialties.map((specialty, index) => (
              <li key={index} className="mb-2">
                {specialty}
              </li>
            ))}
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">強み</h2>
          <ul className="list-disc list-inside">
            {strengths.map((strength, index) => (
              <li key={index} className="mb-2">
                {strength}
              </li>
            ))}
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">ユニークな価値提案</h2>
          <p className="mb-4">
            私の経歴は、ハードウェア製造と品質管理から始まり、現在はクラウドネイティブなソフトウェア開発に至るユニークな道筋を辿っています。この経験により、以下のような価値を提供できます：
          </p>
          <ul className="list-disc list-inside">
            {valuePropositions.map((prop, index) => (
              <li key={index} className="mb-2">
                {prop}
              </li>
            ))}
          </ul>
        </section>
      </div>
    </main>
  );
};

export default AboutPage;
