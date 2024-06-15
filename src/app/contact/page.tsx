import ContactForm from "@/components/Contact/ContactForm";

const ContactPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">お問い合わせ</h1>
      <p className="text-lg text-center mb-6">
        ご質問やフィードバックがございましたら、下記のフォームからお問い合わせください。
      </p>
      <div className="max-w-lg mx-auto">
        <ContactForm />
      </div>
    </div>
  );
};

export default ContactPage;
