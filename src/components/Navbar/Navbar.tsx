import Link from "next/link";
import React from "react";
import { ThemeSwitch } from "../ThemeSwitch";

const Navbar = () => {
  return (
    <nav className="container mx-auto lg:px-2 px-4 lg:w-8/12">
      <div className="flex items-center justify-between">
        <Link href="/" className="text-2xl font-medium">
          MaKe Lab 🚀
        </Link>
        <div>
          <ul className="flex items-center py-4 text-sm">
            <li>
              <Link
                href="/"
                className="block font-medium px-4 py-2 hover:text-sky-900"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/posts/page/1"
                className="block font-medium px-4 py-2 hover:text-sky-900"
              >
                Blog
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className="block font-medium px-4 py-2 hover:text-sky-900"
              >
                Contact
              </Link>
            </li>
            <li>
              <ThemeSwitch />
            </li>
          </ul>
        </div>
      </div>
      <div className="border-b border-gray-400"></div>
    </nav>
  );
};

export default Navbar;
