import React from "react";
import { matchYoutubeUrl } from "utils";
import styles from "./OpenVideoButton.module.css";

type Props = {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  videoURL?: string;
};

export const OpenVideoButton = ({ onClick, videoURL }: Props) => {
  const defaultVideo =
    "https://www.youtube.com/watch?v=c0bC3s8VU6k&ab_channel=HospitalEngineeringExpo";
  const videoId = matchYoutubeUrl(videoURL || defaultVideo);

  const previewURL = `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;

  return (
    <div className={styles.button}>
      <button
        onClick={onClick}
        style={{ backgroundImage: `url(${previewURL})` }}
        className="btn-3 bg-opacity-15 rounded-md text-[#00B4BF] border-[4px] border-[#00B4BF] animate-pulse flex items-center justify-center bg-center bg-cover w-full h-full"
      >
        <svg
          className="pl-1"
          width="24"
          height="24"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M18.25 12L5.75 5.75V18.25L18.25 12Z"
          />
        </svg>
        <span className="sr-only">Open Video</span>
      </button>
    </div>
  );
};
