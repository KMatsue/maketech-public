import ContactPageClient from "@/components/Contact/ContactPageClient";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "お問い合わせ",
  description:
    "MaKeTECHへのお問い合わせページです。ご質問、フィードバック、お仕事のご依頼などはこちらからお願いします。",
  keywords: ["お問い合わせ", "フィードバック", "Web開発", "プログラミング"],
};

const ContactPage = () => {
  return (
    <main className="container mx-auto w-full mt-14 px-4 md:px-8 lg:px-16">
      <div className="mx-auto lg:w-9/12">
        {/* ヘッダーセクション */}
        <header className="text-center my-8">
          <h1 className="text-4xl font-bold mb-4">Contact</h1>
          <p className="text-lg text-muted-foreground">
            ご質問やフィードバックがございましたら、下記のフォームからお問い合わせください。
          </p>
        </header>
        {/* フォームセクション */}
        <section className="mb-8">
          <div className="max-w-lg mx-auto">
            <Suspense fallback={<div>読み込み中...</div>}>
              <ContactPageClient />
            </Suspense>
          </div>
        </section>
      </div>
    </main>
  );
};

export default ContactPage;
