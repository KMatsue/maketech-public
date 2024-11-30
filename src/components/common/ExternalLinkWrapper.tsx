import React from "react";
import Link from "next/link";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";

type ExternalLinkWrapperProps = {
  href: string;
  children: React.ReactNode;
  className?: string;
  showIcon?: boolean;
};

const ExternalLinkWrapper: React.FC<ExternalLinkWrapperProps> = ({
  href,
  children,
  className = "",
  showIcon = true,
}) => {
  const isExternal = !href.startsWith("/") && !href.startsWith("#");

  if (isExternal) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={`inline-flex items-center hover:underline ${className}`}
      >
        {children}
        {showIcon && <ArrowTopRightOnSquareIcon className="ml-1 h-4 w-4" />}
      </a>
    );
  }

  return (
    <Link href={href} className={`hover:underline ${className}`}>
      {children}
    </Link>
  );
};

export default ExternalLinkWrapper;
