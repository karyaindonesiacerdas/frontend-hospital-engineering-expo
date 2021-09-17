/* eslint-disable @next/next/no-img-element */
import React from "react";
import Image from "next/image";
import styles from "./SeminarLink.module.css";

export const SeminarLink = () => {
  return (
    <div className={styles.link}>
      <div className="grid grid-cols-2 gap-0.5 sm:gap-2 p-0 sm:p-1 rounded-lg transform -translate-y-3 sm:translate-y-0 bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg">
        <a
          className="flex items-center justify-center py-1 sm:py-0 bg-red-50 text-red-500 hover:text-white font-bold sm:rounded-md cursor-pointer hover:bg-red-500 transition"
          href="https://youtube.com"
          target="_blank"
          rel="noreferrer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="800"
            width="1200"
            viewBox="-35.20005 -41.33325 305.0671 247.9995"
          >
            <path
              d="M229.763 25.817c-2.699-10.162-10.65-18.165-20.748-20.881C190.716 0 117.333 0 117.333 0S43.951 0 25.651 4.936C15.553 7.652 7.6 15.655 4.903 25.817 0 44.236 0 82.667 0 82.667s0 38.429 4.903 56.85C7.6 149.68 15.553 157.681 25.65 160.4c18.3 4.934 91.682 4.934 91.682 4.934s73.383 0 91.682-4.934c10.098-2.718 18.049-10.72 20.748-20.882 4.904-18.421 4.904-56.85 4.904-56.85s0-38.431-4.904-56.85"
              fill="red"
            />
            <path d="M93.333 117.559l61.333-34.89-61.333-34.894z" fill="#fff" />
          </svg>
          <span className="hidden lg:inline-block">Watch on Youtube</span>
        </a>
        <a
          className="flex items-center justify-center py-1 sm:py-0 bg-blue-50 text-blue-500 hover:text-white font-bold sm:rounded-md cursor-pointer hover:bg-blue-500 transition"
          href="https://zoom.us"
          target="_blank"
          rel="noreferrer"
        >
          <img src="/zoom-logo.png" alt="zoom logo" />
          <span className="hidden lg:inline-block">Join a Meeting</span>
        </a>
      </div>
    </div>
  );
};
