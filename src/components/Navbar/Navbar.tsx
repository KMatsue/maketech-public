"use client";

import Link from "next/link";
import React, { useState } from "react";
import { ThemeSwitch } from "@/components/ThemeSwitch";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

const Navbar = () => {
  const [openMenu, setOpenMenu] = useState(false);

  const menuList = [
    { name: "Home", link: "/" },
    {
      name: "Blog",
      link: "/posts/page/1",
    },
    {
      name: "Contact",
      link: "/contact",
    },
  ];
  return (
    <nav className="container mx-auto lg:px-2 px-4 lg:w-8/12">
      <div className="flex items-center justify-between border-b border-gray-400 ">
        <Link href="/" className="text-2xl font-medium py-2">
          MaKe Lab 🚀
        </Link>

        <div>
          <ul className="sm:flex hidden flex-initial text-left items-center py-2 text-md ">
            {menuList.map((menu, index) => (
              <li key={index}>
                <Link
                  href={menu.link}
                  className="block font-medium px-4 py-2 hover:text-gray-400 hover:underline"
                >
                  {menu.name}
                </Link>
              </li>
            ))}

            <li>
              <ThemeSwitch />
            </li>
          </ul>
          <button
            onClick={() => setOpenMenu(!openMenu)}
            className="flex-initial py-2 text-md  sm:hidden"
          >
            <Bars3Icon className="w-8 h-8 text-black dark:text-white" />
          </button>
          {openMenu ? (
            <div className="flex flex-row absolute z-10 top-0 right-0 min-h-fit min-w-full">
              <div className="basis-1/2"></div>

              <div className="basis-1/2 bg-gray-300 dark:bg-gray-600 pb-10">
                <ul className="text-center">
                  <li className="text-right p-2 ">
                    <button
                      onClick={() => setOpenMenu(!openMenu)}
                      className="font-bold"
                    >
                      <XMarkIcon className="w-8 h-8 text-black dark:text-white" />
                    </button>
                  </li>
                  {menuList.map((menu, index) => (
                    <li key={index} className="py-4">
                      <Link
                        href={menu.link}
                        onClick={() => setOpenMenu(!openMenu)}
                      >
                        {menu.name}
                      </Link>
                    </li>
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
