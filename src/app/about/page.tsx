import React from "react";
import Accordion from "@/components/About/Accodion";
import SkillSet from "@/components/About/SkillSet";
import Timeline from "@/components/About/Timeline";
import {
  careerEvents,
  skills,
  projectDetails,
  specialties,
  strengthsAndValueProps,
  hobbiesAndInterests,
  hobbiesSummary,
} from "@/data/aboutPageData";
import { Metadata } from "next";

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

const AboutPage = () => {
  return (
    <main className="container mx-auto w-full mt-14 px-4 md:px-8 lg:px-16">
      <div className="mx-auto lg:w-9/12">
        <header className="text-center my-8">
          <h1 className="text-4xl font-bold mb-4">About Me</h1>
          <p className="text-lg text-gray-700 dark:text-gray-300">
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
          <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
            スキルセット
          </h2>
          <SkillSet skills={skills} />
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
          <h2 className="text-2xl font-semibold mb-4">強みと価値提案</h2>
          {strengthsAndValueProps.map((item, index) => (
            <div key={index} className="mb-4">
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p>{item.description}</p>
            </div>
          ))}
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">趣味・関心事</h2>
          <div className="space-y-4">
            {hobbiesAndInterests.map((hobby, index) => (
              <div key={index}>
                <h3 className="text-xl font-semibold mb-2">{hobby.title}</h3>
                <p>{hobby.description}</p>
              </div>
            ))}
            <p className="mt-2">{hobbiesSummary}</p>
          </div>
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
              className="border border-gray-800 dark:border-gray-200 text-gray-800 dark:text-gray-200 font-semibold py-2 px-6 rounded-lg transition duration-300 ease-in-out hover:shadow-md hover:bg-gray-800 hover:text-white dark:hover:bg-gray-200 dark:hover:text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
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
