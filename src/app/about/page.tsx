import React from "react";

const AboutPage = () => {
  return (
    <main className="container mx-auto w-full mt-14 px-4 md:px-8 lg:px-16">
      <div className="mx-auto lg:w-9/12">
        <header className="text-center my-8">
          <h1 className="text-4xl font-bold mb-4">About Me</h1>
        </header>
        <section className="mb-8">
          <p className="text-lg mb-4">
            ここに自己紹介文を記入します。技術的なバックグラウンド、興味のある分野、
            現在取り組んでいるプロジェクトなどについて書くことができます。
          </p>
          <p className="text-lg mb-4">
            このブログでは、私の技術的な学びや経験を共有しています。
            主に[主要なトピック]について書いていますが、時々その他の話題も取り上げます。
          </p>
        </section>
        {/* 必要に応じて、スキルセット、経歴、プロジェクトなどのセクションを追加できます */}
      </div>
    </main>
  );
};

export default AboutPage;
