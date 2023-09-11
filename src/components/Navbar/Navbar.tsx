import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <nav className="container mx-auto lg:px-2 px-5 lg:w-3/5">
      <div className="container flex items-center justify-between mx-auto">
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
                href="/"
                className="block font-medium px-4 py-2 hover:text-sky-900"
              >
                Product
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="flex-1 border-b border-gray-500"></div>
    </nav>
  );
};

export default Navbar;
