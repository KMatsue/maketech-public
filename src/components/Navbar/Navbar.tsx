"use client";

import Link from "next/link";
import React, { useState, useEffect } from "react";
import { ThemeSwitch } from "@/components/ThemeSwitch";
import { XMarkIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { SearchModal } from "@/components/Search";

const Navbar = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const pathName: string = usePathname();

  const navMenuList = [
    { name: "Home", link: "/" },
    { name: "Blog", link: "/posts/page/1" },
    // { name: "Tools", link: "/tools" },
    // { name: "About", link: "/about" },
    { name: "Contact", link: "/contact" },
  ];

  const isActive = (link: string) => {
    if (link === "/posts/page/1" && pathName.startsWith("/posts/")) {
      return true;
    }
    return link === pathName;
  };

  // グローバルキーボードショートカット
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key === "k") {
        event.preventDefault();
        setIsSearchOpen(true);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <nav className="container mx-auto px-4 md:px-8 lg:px-16">
      <div className="flex items-center justify-between border-b border-navbar-border py-4">
        <Link href="/" className="text-2xl font-medium text-navbar-text">
          MaKe TECH{" "}
          <span
            className="cursor-pointer"
            onClick={() => (window.location.href = "/tools")}
          >
            🚀
          </span>
        </Link>

        <div>
          <ul className="hidden md:flex items-center tracking-wider gap-6">
            {navMenuList.map((menu, index) => (
              <li
                key={index}
                className={`font-medium text-navbar-text hover:text-navbar-text-hover cursor-pointer duration-300 group relative ${
                  isActive(menu.link) ? "text-navbar-text" : ""
                }`}
              >
                <Link href={menu.link}>{menu.name}</Link>
                <span
                  className={`${
                    isActive(menu.link) ? "scale-100" : "scale-0"
                  } absolute w-full group-hover:scale-100 inline-block h-0.5
                   -bottom-[1px] left-0 bg-navbar-text duration-500`}
                ></span>
              </li>
            ))}
            <li>
              <button
                onClick={() => setIsSearchOpen(true)}
                className="
                  p-2 rounded-lg
                  text-navbar-text hover:text-navbar-text-hover
                  hover:bg-navbar-bg/50
                  transition-colors duration-300
                "
                aria-label="検索"
                title="検索 (Ctrl+K)"
              >
                <MagnifyingGlassIcon className="h-5 w-5" />
              </button>
            </li>
            <li>
              <ThemeSwitch />
            </li>
          </ul>
          {/* ハンバーガーメニューボタン */}
          <div
            className="w-7 h-5 group md:hidden flex flex-col justify-between cursor-pointer overflow-hidden"
            onClick={() => setOpenMenu(!openMenu)}
          >
            {!openMenu ? (
              <>
                <span className="w-full h-[3px] bg-navbar-text inline-flex -translate-x-1 group-hover:translate-x-0 transition-transform duration-500"></span>
                <span className="w-full h-[3px] bg-navbar-text inline-flex -translate-x-3 group-hover:translate-x-0 transition-transform duration-500"></span>
                <span className="w-full h-[3px] bg-navbar-text"></span>
              </>
            ) : (
              <XMarkIcon className="w-7 h-7 text-navbar-text" />
            )}
          </div>
          {/* スモールサイズ時のメニュー */}
          {openMenu && (
            <div className="w-full h-screen lg:hidden fixed top-0 left-0 bg-navbar-bg bg-opacity-90 z-50">
              <motion.div
                className="w-full h-min bg-navbar-bg px-4 pb-3 relative border border-navbar-border"
                initial={{ x: 40, y: -40, opacity: 0 }}
                animate={{ x: 0, y: 0, opacity: 1 }}
                transition={{ duration: 0.2 }}
              >
                <div className="text-center relative">
                  <span
                    className="absolute right-3 top-3 rounded-md ring-2 ring-navbar-text hover:ring-navbar-text-hover cursor-pointer duration-300"
                    onClick={() => setOpenMenu(!openMenu)}
                  >
                    <XMarkIcon className="w-7 h-7 text-navbar-text" />
                  </span>
                  <p className="text-center text-2xl font-medium text-navbar-text hover:text-navbar-text-hover mb-4 inline-block cursor-pointer">
                    <Link href="/">MaKe TECH 🚀</Link>
                  </p>
                </div>

                <ul className="flex flex-col text-navbar-text gap-4 font-semibold mt-4 mb-6">
                  {navMenuList.map((menu, index) => (
                    <li key={index} className="hover:text-navbar-text-hover">
                      <Link
                        href={menu.link}
                        onClick={() => setOpenMenu(!openMenu)}
                      >
                        {menu.name}
                      </Link>
                    </li>
                  ))}
                  <li>
                    <button
                      onClick={() => {
                        setIsSearchOpen(true);
                        setOpenMenu(false);
                      }}
                      className="
                        flex items-center gap-2
                        text-navbar-text hover:text-navbar-text-hover
                        transition-colors duration-300
                      "
                    >
                      <MagnifyingGlassIcon className="h-5 w-5" />
                      検索
                    </button>
                  </li>
                </ul>

                <div className="border-t border-navbar-border pt-4 mt-auto">
                  <div className="flex items-center justify-center">
                    <p className="text-muted-foreground mr-2">Switch theme</p>
                    <ThemeSwitch />
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </div>
      </div>

      {/* 検索モーダル */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
    </nav>
  );
};

export default Navbar;
