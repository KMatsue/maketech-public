"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { ThemeSwitch } from "@/components/ThemeSwitch";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

const Navbar = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const [active, setActive] = useState<string>();
  const pathName: string = usePathname();

  useEffect(() => {
    setActive(pathName);
  }, [pathName]);

  const navMenuList = [
    { name: "Home", link: "/" },
    {
      name: "Blog",
      link: "/posts/page/1",
    },
  ];

  return (
    <nav className="container mx-auto px-4 md:px-8 lg:px-16">
      <div className="flex items-center justify-between border-b border-gray-400 dark:border-gray-600 py-4">
        <Link
          href="/"
          className="text-2xl font-medium text-black dark:text-white"
        >
          MaKe TECH 🚀
        </Link>

        <div>
          <ul className="hidden md:flex items-center tracking-wider gap-6">
            {navMenuList.map((menu, index) => (
              <li
                key={index}
                className="font-medium hover:text-gray-600 dark:hover:text-gray-300 cursor-pointer duration-300 group relative"
              >
                <Link href={menu.link} className="text-black dark:text-white">
                  {menu.name}
                </Link>
                <span
                  className={`${
                    active === menu.link && "scale-100"
                  } absolute w-full scale-0 group-hover:scale-100 inline-block h-0.5
                   -bottom-[1px] left-0 bg-gray-700 dark:bg-gray-300 duration-500`}
                ></span>
              </li>
            ))}
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
                <span className="w-full h-[3px] bg-black dark:bg-white inline-flex -translate-x-1 group-hover:translate-x-0 transition-transform duration-500"></span>
                <span className="w-full h-[3px] bg-black dark:bg-white inline-flex -translate-x-3 group-hover:translate-x-0 transition-transform duration-500"></span>
                <span className="w-full h-[3px] bg-black dark:bg-white"></span>
              </>
            ) : (
              <XMarkIcon className="w-7 h-7 text-black dark:text-white" />
            )}
          </div>
          {/* スモールサイズ時のメニュー */}
          {openMenu && (
            <div className="w-full h-screen lg:hidden fixed top-0 left-0 bg-gray-200 dark:bg-gray-900 bg-opacity-90 dark:bg-opacity-90 z-50">
              <motion.div
                className="w-[100%] h-min bg-white dark:bg-gray-800 px-4 pb-3 relative border border-gray-400 dark:border-gray-700"
                initial={{ x: 40, y: -40, opacity: 0 }}
                animate={{ x: 0, y: 0, opacity: 1 }}
                transition={{ duration: 0.2 }}
              >
                <div className="text-center">
                  <span
                    className="absolute right-3 top-3 rounded-md ring-2 ring-black dark:ring-white hover:ring-gray-600 dark:hover:ring-gray-300 text-black dark:text-white hover:text-gray-600 dark:hover:text-gray-300 cursor-pointer duration-300"
                    onClick={() => setOpenMenu(!openMenu)}
                  >
                    <XMarkIcon className="w-7 h-7" />
                  </span>
                  <p className="text-center text-2xl font-medium text-black dark:text-white hover:text-gray-600 dark:hover:text-gray-300 mb-4 inline-block cursor-pointer">
                    <Link href="/">MaKe TECH 🚀</Link>
                  </p>
                </div>

                <ul className="flex flex-col text-black dark:text-white gap-4 font-semibold mt-4 mb-6">
                  {navMenuList.map((menu, index) => (
                    <li
                      key={index}
                      className="hover:text-gray-600 dark:hover:text-gray-300"
                    >
                      <Link
                        href={menu.link}
                        onClick={() => setOpenMenu(!openMenu)}
                      >
                        {menu.name}
                      </Link>
                    </li>
                  ))}
                </ul>

                <div className="border-t border-gray-300 dark:border-gray-700 pt-4 mt-auto">
                  <div className="flex items-center justify-center">
                    <p className="text-gray-600 dark:text-gray-300 mr-2">
                      Switch theme
                    </p>
                    <ThemeSwitch />
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
