"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import {
  SunIcon,
  MoonIcon,
  ComputerDesktopIcon,
  FireIcon,
} from "@heroicons/react/24/outline";

const themes = [
  { name: "light", label: "Light", icon: SunIcon },
  { name: "dark", label: "Dark", icon: MoonIcon },
  { name: "sunset-orange", label: "Sunset", icon: FireIcon },
  { name: "terminal-green", label: "Terminal", icon: ComputerDesktopIcon },
];

export const ThemeSwitch = () => {
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const currentTheme = themes.find((t) => t.name === theme) || themes[0];
  const CurrentIcon = currentTheme.icon;

  const handleThemeChange = (themeName: string) => {
    console.log("🎨 Theme changing from:", theme, "to:", themeName);
    setTheme(themeName);
    setIsOpen(false);

    // Force cleanup when switching themes to ensure clean transitions
    setTimeout(() => {
      console.log(
        "🔧 Before cleanup, classes:",
        document.documentElement.className
      );
      document.documentElement.classList.remove(
        "dark",
        "terminal-green",
        "sunset-orange",
        "light"
      );
      if (themeName !== "light") {
        document.documentElement.classList.add(themeName);
      }
      console.log(
        "✅ After cleanup, classes:",
        document.documentElement.className
      );

      // CSS Variable check
      const primaryColor = getComputedStyle(
        document.documentElement
      ).getPropertyValue("--primary");
      const backgroundColor = getComputedStyle(
        document.documentElement
      ).getPropertyValue("--background");
      console.log(
        "🎨 CSS Variables - Primary:",
        primaryColor,
        "Background:",
        backgroundColor
      );

      // Force CSS recalculation
      document.body.offsetHeight;
    }, 50);
  };

  return (
    <div className="relative">
      <button
        className="flex items-center p-1 rounded-full hover:bg-theme-switch-hover-bg transition-colors"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="テーマを変更"
      >
        <CurrentIcon className="w-6 h-6 text-foreground" />
      </button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />

          {/* Dropdown Menu */}
          <div className="absolute right-0 mt-2 py-2 w-32 bg-theme-switch-dropdown-bg rounded-md shadow-lg border border-theme-switch-dropdown-border z-20">
            {themes.map((themeOption) => {
              const Icon = themeOption.icon;
              const isActive = theme === themeOption.name;

              return (
                <button
                  key={themeOption.name}
                  onClick={() => handleThemeChange(themeOption.name)}
                  className={`w-full flex items-center px-4 py-2 text-sm hover:bg-theme-switch-item-hover-bg transition-colors ${
                    isActive
                      ? "bg-theme-switch-active-bg text-theme-switch-active-text"
                      : "text-theme-switch-item-text"
                  }`}
                >
                  <Icon className="w-4 h-4 mr-3" />
                  {themeOption.label}
                  {themeOption.name === "terminal-green" && (
                    <span className="ml-1 text-xs text-green-500">●</span>
                  )}
                  {themeOption.name === "sunset-orange" && (
                    <span className="ml-1 text-xs text-orange-500">🔥</span>
                  )}
                </button>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};
