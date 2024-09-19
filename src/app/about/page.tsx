import React from "react";
import Accordion from "@/components/About/Accodion";
import SkillSet from "@/components/About/SkillSet";
import Timeline from "@/components/About/Timeline";
import {
  careerEvents,
  skills,
  projectDetails,
  specialties,
  strengths,
  valuePropositions,
  strengthsAndValueProps,
} from "@/data/aboutPageData";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Me | MaKe",
  description: "開発者のプロフィールページ",
};

const AboutPage = () => {
  return (
    <main className="container mx-auto w-full mt-14 px-4 md:px-8 lg:px-16">
      <div className="mx-auto lg:w-9/12">
        <header className="text-center my-8">
          <h1 className="text-4xl font-bold mb-4">About Me</h1>
          <p className="text-lg text-gray-700 dark:text-gray-300">
            Web/Mobileアプリ開発者です。
          </p>
        </header>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">職務経歴</h2>
          <Timeline events={careerEvents} />
        </section>
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
            スキルセット
          </h2>
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
          <h2 className="text-2xl font-semibold mb-4">強みと価値提案</h2>
          {strengthsAndValueProps.map((item, index) => (
            <div key={index} className="mb-4">
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p>{item.description}</p>
            </div>
          ))}
        </section>

        {/* <section className="mb-12">
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
        </section> */}
      </div>
    </main>
  );
};

export default AboutPage;
