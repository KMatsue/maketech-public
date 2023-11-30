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
    // {
    //   name: "Contact",
    //   link: "/contact",
    // },
  ];
  return (
    <nav className="container mx-auto">
      <div className="flex items-center justify-between border-b border-gray-400 ">
        <Link href="/" className="text-2xl font-medium py-2">
          MaKe Lab 🚀
        </Link>

        <div>
          <ul className="hidden md:flex items-center py-4 tracking-wider gap-6">
            {navMenuList.map((menu, index) => (
              <li
                key={index}
                className="font-medium hover:text-gray-400 cursor-pointer duration-300 group relative"
              >
                <Link href={menu.link}>{menu.name}</Link>
                <span
                  className={`${
                    active === menu.link && "scale-100"
                  } absolute w-full scale-0 group-hover:scale-100 inline-block h-0.5
                   -bottom-[1px] left-0 bg-black dark:bg-white duration-500`}
                ></span>
              </li>
            ))}
            <li>
              <ThemeSwitch />
            </li>
          </ul>
          {/* ハンバーガーメニューボタン */}
          {!openMenu ? (
            <div
              className="w-7 h-5 group md:hidden flex flex-col justify-between
            cursor-pointer overflow-hidden"
              onClick={() => setOpenMenu(!openMenu)}
            >
              <span
                className="w-full h-[3px] bg-slate-900 dark:bg-slate-50 
            inline-flex -translate-x-1 group-hover:translate-x-0 transition-transform duration-500"
              ></span>
              <span
                className="w-full h-[3px] bg-slate-900 dark:bg-slate-50 
            inline-flex -translate-x-3 group-hover:translate-x-0 transition-transform duration-500"
              ></span>
              <span className="w-full h-[3px] bg-slate-900 dark:bg-slate-50"></span>
            </div>
          ) : undefined}
          {/* スモールサイズ時のメニュー */}
          {openMenu && (
            <div className="w-full h-screen lg:hidden fixed top-0 left-0 bg-white bg-opacity-80 dark:bg-black dark:bg-opacity-80 z-50">
              <motion.div
                className="w-[100%] h-min bg-neutral-950 px-4 pb-3 relative"
                initial={{ x: 40, y: -40, opacity: 0 }}
                animate={{ x: 0, y: 0, opacity: 1 }}
                transition={{ duration: 0.2 }}
              >
                <div className="text-center">
                  <span
                    className="absolute right-3 top-3
                  rounded-md ring-2 ring-white hover:ring-slate-300
                text-white hover:text-slate-300
                  cursor-pointer duration-300"
                    onClick={() => setOpenMenu(!openMenu)}
                  >
                    <XMarkIcon className="w-7 h-7" />
                  </span>
                  <p
                    className="text-center text-2xl font-medium text-white hover:text-slate-300 
                    mb-4 inline-block cursor-pointer"
                    onClick={() => setOpenMenu(!openMenu)}
                  >
                    <Link href="/">MaKe Lab 🚀</Link>
                  </p>
                </div>

                <ul className="flex flex-col text-gray-300 gap-3 font-semibold">
                  {" "}
                  {navMenuList.map((menu, index) => (
                    <li key={index} className="hover:text-white">
                      <Link
                        href={menu.link}
                        onClick={() => setOpenMenu(!openMenu)}
                      >
                        {menu.name}{" "}
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
