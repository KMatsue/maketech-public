"use client";

import React, { useEffect } from "react";

type ToastProps = {
  message: string;
  type: "success" | "error";
  onClose: () => void;
};

const Toast: React.FC<ToastProps> = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div
      className={`fixed left-1/2 transform -translate-x-1/2 mt-4 p-4 rounded shadow-lg z-50 max-w-lg w-full mx-auto text-center ${
        type === "success"
          ? "bg-gray-800 dark:bg-gray-600 text-white"
          : "bg-red-500 text-white"
      }`}
    >
      {message}
    </div>
  );
};

export default Toast;
