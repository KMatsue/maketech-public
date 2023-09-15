"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { SunIcon } from "@heroicons/react/20/solid";
import { MoonIcon } from "@heroicons/react/20/solid";

export const ThemeSwitch = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const handleSetTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <div>
      <button
        className="block p-1 bg-black dark:bg-white rounded-full"
        onClick={handleSetTheme}
      >
        {theme === "light" ? (
          <MoonIcon className="w-4 h-4 text-white" />
        ) : (
          <SunIcon className="w-4 h-4 text-black" />
        )}
      </button>
    </div>
  );
};
