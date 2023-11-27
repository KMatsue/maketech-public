import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer className="fixed bottom-0 left-0 w-full flex justify-center pb-4 ">
      <p>
        Copyright &copy;
        <Link href="/" className="mx-1 hover:underline">
          MAKE Lab
        </Link>{" "}
        2023
      </p>
    </footer>
  );
};

export default Footer;
