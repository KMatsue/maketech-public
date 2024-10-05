"use client";

import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import Toast from "@/components/Toast/Toast";

type Inputs = {
  name: string;
  email: string;
  message: string;
};

const ContactForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Inputs>();
  const [isSending, setIsSending] = useState(false);
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setIsSending(true);
    setToast(null);

    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

    try {
      const res = await fetch(`${apiUrl}/api/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        setToast({ message: "送信に成功しました", type: "success" });
        reset();
      } else {
        setToast({ message: "送信に失敗しました", type: "error" });
      }
    } catch (error) {
      setToast({ message: "送信中にエラーが発生しました", type: "error" });
    } finally {
      setIsSending(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-lg mx-auto mt-8">
      <div className="mb-4">
        <label
          htmlFor="name"
          className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2"
        >
          名前
        </label>
        <input
          id="name"
          {...register("name", { required: "名前は必須です" })}
          className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-300 leading-tight focus:outline-none focus:shadow-outline ${
            errors.name ? "border-red-500" : ""
          }`}
        />
        {errors.name && (
          <p className="text-red-500 text-xs italic">{errors.name.message}</p>
        )}
      </div>

      <div className="mb-4">
        <label
          htmlFor="email"
          className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2"
        >
          メール
        </label>
        <input
          id="email"
          {...register("email", {
            required: "メールアドレスは必須です",
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "有効なメールアドレスを入力してください",
            },
          })}
          className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-300 leading-tight focus:outline-none focus:shadow-outline ${
            errors.email ? "border-red-500" : ""
          }`}
        />
        {errors.email && (
          <p className="text-red-500 text-xs italic">{errors.email.message}</p>
        )}
      </div>

      <div className="mb-6">
        <label
          htmlFor="message"
          className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2"
        >
          メッセージ
        </label>
        <textarea
          id="message"
          {...register("message", { required: "メッセージは必須です" })}
          className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-300 leading-tight focus:outline-none focus:shadow-outline ${
            errors.message ? "border-red-500" : ""
          }`}
          rows={5}
        />
        {errors.message && (
          <p className="text-red-500 text-xs italic">
            {errors.message.message}
          </p>
        )}
      </div>

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

export default ContactForm;
