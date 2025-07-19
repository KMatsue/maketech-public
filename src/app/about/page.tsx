import React from "react";
import Timeline from "@/components/About/Timeline";
import Accordion from "@/components/About/Accodion";
import SkillSet from "@/components/About/SkillSet";
import Specialties from "@/components/About/Specialties";
import Hobbies from "@/components/About/Hobbies";
import {
  getCareersFromNotion,
  getProjectsFromNotion,
  getSkillsFromNotion,
  getSpecialtiesFromNotion,
  getHobbiesFromNotion,
  getHobbiesSummaryFromNotion,
} from "@/lib/notionAbout";
import { Metadata } from "next";

// Notionデータの更新を反映するため10分ごとに再検証
export const revalidate = 600;

export const metadata: Metadata = {
  title: "プロフィール",
  description:
    "MaKeTECHの著者プロフィールページです。Web開発者としての経歴、スキル、プロジェクト実績などを紹介しています。",
  keywords: [
    "プロフィール",
    "Web開発者",
    "アプリ開発",
    "ソフトウェアエンジニア",
    "経歴",
  ],
};

const AboutPage = async () => {
  // Notion APIから全データを並列取得
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

  return (
    <main className="container mx-auto w-full mt-14 px-4 md:px-8 lg:px-16">
      <div className="mx-auto lg:w-9/12">
        <header className="text-center my-8">
          <h1 className="text-4xl font-bold mb-4">About Me</h1>
          <p className="text-lg text-muted-foreground">
            Web/Mobileアプリの開発者。ITを通じて価値あるサービスの提供を目指しています。
            製造業での業務経験を活かし、使う人の目線に立ったソフトウェア開発に取り組んでいます。
          </p>
        </header>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">職務経歴</h2>
          <Timeline events={careerEvents} />
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">プロジェクト経歴</h2>
          <Accordion items={projectDetails} />
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4 text-foreground">
            スキルセット
          </h2>
          <SkillSet skills={skills} />
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4 text-foreground">
            専門分野
          </h2>
          <Specialties specialties={specialties} />
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4 text-foreground">
            趣味・関心事
          </h2>
          <Hobbies hobbies={hobbies} summary={hobbiesSummary} />
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-semibold mb-4 text-center">
            お問い合わせ
          </h2>
          <div className="max-w-md mx-auto text-center">
            <p className="mb-4">
              ご質問やお問い合わせがございましたら、お気軽にコンタクトページからご連絡ください。
            </p>
            <a
              href="/contact"
              className="border border-border-primary text-foreground font-semibold py-2 px-6 rounded-lg transition duration-300 ease-in-out hover:shadow-md hover:bg-primary hover:text-primary-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50"
            >
              コンタクトページへ
            </a>
          </div>
        </section>
      </div>
    </main>
  );
};

export default AboutPage;
