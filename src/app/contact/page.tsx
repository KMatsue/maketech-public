import ContactForm from "@/components/Contact/ContactForm";

const ContactPage = () => {
  return (
    <main className="container mx-auto w-full mt-14 px-4 md:px-8 lg:px-16">
      <div className="mx-auto lg:w-9/12">
        {/* ヘッダーセクション */}
        <header className="text-center my-8">
          <h2 className="text-3xl font-bold mb-4">お問い合わせ</h2>
          <p className="text-lg text-gray-700 dark:text-gray-300">
            ご質問やフィードバックがございましたら、下記のフォームからお問い合わせください。
          </p>
        </header>
        {/* フォームセクション */}
        <section className="mb-8">
          <div className="max-w-lg mx-auto">
            <ContactForm />
          </div>
        </section>
      </div>
    </main>
  );
};

export default ContactPage;
