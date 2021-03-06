/* eslint-disable @next/next/no-img-element */
import React from "react";
import Link from "next/link";
import styles from "./SeminarLink.module.css";
import { useSettings } from "hooks/useSettings";

export const SeminarLink = () => {
  const { data } = useSettings();
  // console.log({ data });
  return (
    <div className={styles.link}>
      <div className="grid grid-cols-2 gap-0.5 sm:gap-2 p-0 sm:p-1 rounded-lg transform -translate-y-3 sm:translate-y-0 bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg">
        {/* <Link href="/webinar-schedule">
          <a className="flex items-center justify-center py-1 sm:py-0 bg-primary-50 text-primary-500 hover:text-white font-bold sm:rounded-md cursor-pointer hover:bg-primary-500 transition">
            <span className="text-[1vw]">Webinar Schedule</span>
          </a>
        </Link> */}
        <a
          className="flex items-center justify-center py-1 sm:py-0 bg-red-50 text-red-500 hover:text-white font-bold sm:rounded-md cursor-pointer hover:bg-red-500 transition"
          href={data?.youtube_link}
          target="_blank"
          rel="noreferrer"
        >
          <img src="/youtube.png" alt="zoom logo" />
          <span className="hidden lg:inline-block text-[1vw]">
            Watch on Youtube
          </span>
        </a>
        <a
          className="flex items-center justify-center py-1 sm:py-0 bg-blue-50 text-blue-500 hover:text-white font-bold sm:rounded-md cursor-pointer hover:bg-blue-500 transition"
          href={data?.zoom_link}
          target="_blank"
          rel="noreferrer"
        >
          <img src="/zoom-logo.png" alt="zoom logo" />
          <span className="hidden lg:inline-block text-[1vw]">
            Join a Meeting
          </span>
        </a>
      </div>
    </div>
  );
};
