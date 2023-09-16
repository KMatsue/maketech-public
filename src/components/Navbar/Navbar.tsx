import Link from "next/link";
import React from "react";
import { ThemeSwitch } from "@/components/ThemeSwitch";

const Navbar = () => {
  return (
    <nav className="container mx-auto lg:px-2 px-4 lg:w-8/12">
      <div className="flex items-center justify-between border-b border-gray-400 ">
        <Link href="/" className="text-2xl font-medium">
          MaKe Lab 🚀
        </Link>
        <div>
          <ul className="flex items-center py-2 text-md ">
            <li>
              <Link
                href="/"
                className="block font-medium px-4 py-2 hover:text-gray-400 hover:underline"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/posts/page/1"
                className="block font-medium px-4 py-2 hover:text-gray-400 hover:underline"
              >
                Blog
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className="block font-medium px-4 py-2 hover:text-gray-400 hover:underline"
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
    </nav>
  );
};

export default Navbar;
