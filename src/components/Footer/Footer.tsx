import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <div className="container flex justify-center mx-auto mb-4">
      <p>
        Copyright
        <Link href="/" className="mx-1">
          &copy;MAKE Lab
        </Link>{" "}
        2023
      </p>
    </div>
  );
};

export default Footer;
