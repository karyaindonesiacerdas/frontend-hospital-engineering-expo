import React from "react";
import Link from "next/link";

export const BackButton = ({ href, text }: { href: string; text: string }) => {
  return (
    <div className="pt-1">
      <Link href={href}>
        <a className="bg-white bg-opacity-50 py-0.5 lg:py-2 pl-1 lg:pl-2 pr-2 lg:pr-3 font-medium rounded-md text-xs sm:text-sm inline-flex items-center space-x-1 group shadow-2xl backdrop-filter backdrop-blur-xl">
          <svg
            className="w-4 group-hover:-translate-x-0.5 transition"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="M10.25 6.75L4.75 12L10.25 17.25"
            />
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="M19.25 12H5"
            />
          </svg>
          <span>{text}</span>
        </a>
      </Link>
    </div>
  );
};
