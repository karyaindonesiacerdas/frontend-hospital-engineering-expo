import React from "react";
import styles from "./ButtonVideo.module.css";

type Props = {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
};

export const ButtonVideo = ({ onClick }: Props) => {
  return (
    <div className="group">
      <button className={styles.button} onClick={onClick}>
        <svg
          className="hidden group-hover:block pl-1"
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
        <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-50">
          <div
            className="flex group-hover:hidden flex-col justify-center items-center w-full h-full"
            style={{ fontSize: "2vw" }}
          >
            <div className="font-bold">PT. Karya Indonesia Cerdas</div>
            <div
              style={{ fontSize: "0.85vw", maxWidth: "25vw" }}
              className="text-gray-500"
            >
              https://karya-indonesia-cerdas.com/
            </div>
            <div
              style={{
                fontSize: "0.7vw",
                maxWidth: "25vw",
                marginTop: "0.3vw",
              }}
              className="text-gray-500 space-x-2"
            >
              <span>info@karya-indonesia-cerdas.com,</span>
              <span>+62895385290704</span>
            </div>
          </div>
        </div>
        <span className="sr-only">Open Video</span>
      </button>
    </div>
  );
};
