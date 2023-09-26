"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { SunIcon, MoonIcon } from "@heroicons/react/24/outline";

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
      <button className="block p-1 rounded-full" onClick={handleSetTheme}>
        {theme === "light" ? (
          <MoonIcon className="w-6 h-6 text-black" />
        ) : (
          <SunIcon className="w-6 h-6 text-white" />
        )}
      </button>
    </div>
  );
};
