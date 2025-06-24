"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import ContactForm from "@/components/Contact/ContactForm";
import { ContactCategory } from "@/types/contact";

const ContactPageClient: React.FC = () => {
  const searchParams = useSearchParams();
  const [formProps, setFormProps] = useState<{
    defaultCategory?: ContactCategory;
    defaultArticleUrl?: string;
    defaultArticleTitle?: string;
  }>({
    defaultCategory: ContactCategory.GENERAL,
  });

  useEffect(() => {
    const categoryParam = searchParams.get("category");
    const articleUrl = searchParams.get("articleUrl");
    const articleTitle = searchParams.get("articleTitle");

    // カテゴリパラメータが有効なContactCategoryかチェック
    const isValidCategory =
      categoryParam &&
      Object.values(ContactCategory).includes(categoryParam as ContactCategory);
    const category = isValidCategory
      ? (categoryParam as ContactCategory)
      : ContactCategory.GENERAL;

    console.log("URL Parameters:", {
      categoryParam,
      articleUrl,
      articleTitle,
      isValidCategory,
      category,
    });

    setFormProps({
      defaultCategory: category,
      defaultArticleUrl: articleUrl || undefined,
      defaultArticleTitle: articleTitle || undefined,
    });
  }, [searchParams]);

  return <ContactForm {...formProps} />;
};

export default ContactPageClient;
