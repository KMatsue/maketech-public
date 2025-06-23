"use client";

import React, { useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import Toast from "@/components/Toast/Toast";
import {
  ContactCategory,
  ContactFormData,
  ContactResponse,
  CONTACT_CATEGORY_LABELS,
} from "@/types/contact";

type FormInputs = {
  name: string;
  email: string;
  message: string;
  category: ContactCategory;
  relatedArticleUrl?: string;
  relatedArticleTitle?: string;
};

interface ContactFormProps {
  defaultCategory?: ContactCategory;
  defaultArticleUrl?: string;
  defaultArticleTitle?: string;
}

const ContactForm: React.FC<ContactFormProps> = ({
  defaultCategory = ContactCategory.GENERAL,
  defaultArticleUrl,
  defaultArticleTitle,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setValue,
  } = useForm<FormInputs>({
    defaultValues: {
      category: defaultCategory,
      relatedArticleUrl: defaultArticleUrl,
      relatedArticleTitle: defaultArticleTitle,
    },
  });

  const [isSending, setIsSending] = useState(false);
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  const selectedCategory = watch("category");

  useEffect(() => {
    if (defaultArticleUrl) {
      setValue("relatedArticleUrl", defaultArticleUrl);
    }
    if (defaultArticleTitle) {
      setValue("relatedArticleTitle", defaultArticleTitle);
    }
  }, [defaultArticleUrl, defaultArticleTitle, setValue]);

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    setIsSending(true);
    setToast(null);

    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

    try {
      const requestData: Partial<ContactFormData> = {
        name: data.name,
        email: data.email,
        message: data.message,
        category: data.category,
        ...(data.relatedArticleUrl && {
          relatedArticleUrl: data.relatedArticleUrl,
        }),
        ...(data.relatedArticleTitle && {
          relatedArticleTitle: data.relatedArticleTitle,
        }),
      };

      const res = await fetch(`${apiUrl}/api/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });

      const responseData: ContactResponse = await res.json();

      if (res.ok && responseData.success) {
        setToast({ message: responseData.message, type: "success" });
        reset();
        // デフォルト値を再設定
        setValue("category", defaultCategory);
        if (defaultArticleUrl) setValue("relatedArticleUrl", defaultArticleUrl);
        if (defaultArticleTitle)
          setValue("relatedArticleTitle", defaultArticleTitle);
      } else {
        setToast({
          message: responseData.error || "送信に失敗しました",
          type: "error",
        });
      }
    } catch (error) {
      console.error("Contact form error:", error);
      setToast({ message: "送信中にエラーが発生しました", type: "error" });
    } finally {
      setIsSending(false);
    }
  };

  const isArticleRelated =
    selectedCategory === ContactCategory.ARTICLE_FEEDBACK ||
    selectedCategory === ContactCategory.ARTICLE_CORRECTION;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-lg mx-auto mt-8">
      {/* カテゴリ選択 */}
      <div className="mb-4">
        <label
          htmlFor="category"
          className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2"
        >
          お問い合わせの種類
        </label>
        <select
          id="category"
          {...register("category", { required: "カテゴリは必須です" })}
          className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-300 dark:bg-gray-800 leading-tight focus:outline-none focus:shadow-outline ${
            errors.category ? "border-red-500" : ""
          }`}
        >
          {Object.entries(CONTACT_CATEGORY_LABELS).map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
        {errors.category && (
          <p className="text-red-500 text-xs italic">
            {errors.category.message}
          </p>
        )}
      </div>

      {/* 名前 */}
      <div className="mb-4">
        <label
          htmlFor="name"
          className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2"
        >
          名前
        </label>
        <input
          id="name"
          type="text"
          {...register("name", { required: "名前は必須です" })}
          className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-300 dark:bg-gray-800 leading-tight focus:outline-none focus:shadow-outline ${
            errors.name ? "border-red-500" : ""
          }`}
        />
        {errors.name && (
          <p className="text-red-500 text-xs italic">{errors.name.message}</p>
        )}
      </div>

      {/* メールアドレス */}
      <div className="mb-4">
        <label
          htmlFor="email"
          className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2"
        >
          メールアドレス
        </label>
        <input
          id="email"
          type="email"
          {...register("email", {
            required: "メールアドレスは必須です",
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "有効なメールアドレスを入力してください",
            },
          })}
          className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-300 dark:bg-gray-800 leading-tight focus:outline-none focus:shadow-outline ${
            errors.email ? "border-red-500" : ""
          }`}
        />
        {errors.email && (
          <p className="text-red-500 text-xs italic">{errors.email.message}</p>
        )}
      </div>

      {/* 記事関連フィールド */}
      {isArticleRelated && (
        <>
          <div className="mb-4">
            <label
              htmlFor="relatedArticleTitle"
              className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2"
            >
              関連記事のタイトル
            </label>
            <input
              id="relatedArticleTitle"
              type="text"
              {...register("relatedArticleTitle")}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-300 dark:bg-gray-800 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="記事のタイトル（任意）"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="relatedArticleUrl"
              className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2"
            >
              関連記事のURL
            </label>
            <input
              id="relatedArticleUrl"
              type="url"
              {...register("relatedArticleUrl")}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-300 dark:bg-gray-800 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="https://example.com/posts/..."
            />
          </div>
        </>
      )}

      {/* メッセージ */}
      <div className="mb-6">
        <label
          htmlFor="message"
          className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2"
        >
          メッセージ
        </label>
        <textarea
          id="message"
          {...register("message", {
            required: "メッセージは必須です",
            maxLength: {
              value: 2000,
              message: "メッセージは2000文字以内で入力してください",
            },
          })}
          className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-300 dark:bg-gray-800 leading-tight focus:outline-none focus:shadow-outline ${
            errors.message ? "border-red-500" : ""
          }`}
          rows={5}
          placeholder={getPlaceholderByCategory(selectedCategory)}
        />
        {errors.message && (
          <p className="text-red-500 text-xs italic">
            {errors.message.message}
          </p>
        )}
      </div>

      {/* 送信ボタン */}
      <div className="flex items-center justify-between">
        <button
          type="submit"
          className={`border border-gray-800 dark:border-gray-200 text-gray-800 dark:text-gray-200 font-semibold py-2 px-6 rounded-lg transition duration-300 ease-in-out ${
            isSending
              ? "opacity-50 cursor-not-allowed"
              : "hover:shadow-md hover:bg-gray-800 hover:text-white dark:hover:bg-gray-200 dark:hover:text-gray-800"
          } focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50`}
          disabled={isSending}
        >
          {isSending ? (
            <div className="flex items-center">
              <svg
                className="animate-spin h-5 w-5 mr-3 text-current"
                viewBox="0 0 24 24"
              >
                <circle
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="none"
                  strokeOpacity="0.25"
                />
                <path
                  d="M2 12a10 10 0 0110-10 10 10 0 0110 10"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="none"
                />
              </svg>
              送信中...
            </div>
          ) : (
            "送信"
          )}
        </button>
      </div>

      {/* トースト通知 */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </form>
  );
};

function getPlaceholderByCategory(category: ContactCategory): string {
  switch (category) {
    case ContactCategory.ARTICLE_FEEDBACK:
      return "記事の感想や追加で知りたい内容があればお聞かせください...";
    case ContactCategory.ARTICLE_CORRECTION:
      return "記事の間違いや改善点があればお聞かせください...";
    case ContactCategory.TECHNICAL:
      return "技術的なご質問をお気軽にどうぞ...";
    case ContactCategory.BUSINESS:
      return "お仕事に関するご相談をお聞かせください...";
    default:
      return "お問い合わせ内容をお聞かせください...";
  }
}

export default ContactForm;
