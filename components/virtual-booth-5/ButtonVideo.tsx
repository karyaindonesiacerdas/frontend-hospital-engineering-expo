import React from "react";
import styles from "./ButtonVideo.module.css";

type Props = {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  companyDetails: {
    name: string;
    email: string;
    website: string;
    phone: string;
  };
};

export const ButtonVideo = ({ onClick, companyDetails }: Props) => {
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
            style={{ fontSize: "1.6vw" }}
          >
            <div className="font-bold">{companyDetails.name}</div>
            <div
              style={{ fontSize: "0.85vw", maxWidth: "25vw" }}
              className="text-gray-500"
            >
              {companyDetails.website}
            </div>
            <div
              style={{
                fontSize: "0.7vw",
                maxWidth: "25vw",
                marginTop: "0.3vw",
              }}
              className="text-gray-500 space-x-2"
            >
              <span>{companyDetails.email},</span>
              <span>{companyDetails.phone}</span>
            </div>
          </div>
        </div>
        <span className="sr-only">Open Video</span>
      </button>
    </div>
  );
};
