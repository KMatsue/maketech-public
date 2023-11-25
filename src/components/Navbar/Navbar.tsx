"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { ThemeSwitch } from "@/components/ThemeSwitch";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { usePathname } from "next/navigation";

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
          {openMenu ? (
            <div className="absolute z-10 top-0 right-0 min-h-fit min-w-full">
              <div className=""></div>

              <div className=" bg-black pb-8">
                <ul className="text-center">
                  <li className="text-right pt-3 pr-4">
                    <button
                      onClick={() => setOpenMenu(!openMenu)}
                      className="font-bold rounded-md ring-1 ring-white"
                    >
                      <XMarkIcon className="w-8 h-8  text-white" />
                    </button>
                  </li>
                  {navMenuList.map((menu, index) => (
                    <Link
                      href={menu.link}
                      key={index}
                      onClick={() => setOpenMenu(!openMenu)}
                    >
                      <li className="py-4 text-white hover:text-black hover:bg-white  dark:hover:bg-gray-400">
                        {menu.name}
                      </li>
                    </Link>
                  ))}
                </ul>
              </div>
            </div>
          ) : undefined}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
