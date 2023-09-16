import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <div className="container flex justify-center mx-auto pb-4 ">
      <p>
        Copyright &copy;
        <Link href="/" className="mx-1 hover:underline">
          MAKE Lab
        </Link>{" "}
        2023
      </p>
    </div>
  );
};

export default Footer;
