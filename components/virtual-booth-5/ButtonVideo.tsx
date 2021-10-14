import React from "react";
import { matchYoutubeUrl } from "utils";
import styles from "./ButtonVideo.module.css";

type Props = {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  companyDetails: {
    name: string;
    email: string;
    website: string;
    phone: string;
    videoURL: string;
  };
};

export const ButtonVideo = ({ onClick, companyDetails }: Props) => {
  console.log({ companyDetails });
  const defaultVideo =
    "https://www.youtube.com/watch?v=c-jBYuYOuD0&ab_channel=HospitalEngineeringExpo";
  const videoId = matchYoutubeUrl(companyDetails.videoURL || defaultVideo);

  // const previewURL = `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;
  // const previewURLDefault = `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;
  // const previewURL =
  //   `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg` || previewURLDefault;
  // console.log({ previewURL });
  const previewURL = `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`;

  return (
    <div className="group">
      <button
        style={{
          // backgroundColor: "black",
          backgroundImage: `url(${previewURL})`,
          backgroundPosition: "center",
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          overflow: "hidden",
        }}
        className={styles.button}
        onClick={onClick}
      >
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
        {/* <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-50">
          <div
            className="flex group-hover:hidden flex-col justify-center items-center w-full h-full"
            style={{ fontSize: "1.6vw" }}
          >
            <div className="font-bold text-primary-600">
              {companyDetails.name}
            </div>
            <div
              style={{ fontSize: "0.85vw", maxWidth: "25vw" }}
              className="text-gray-900"
            >
              {companyDetails.website}
            </div>
            <div
              style={{
                fontSize: "0.7vw",
                maxWidth: "25vw",
                marginTop: "0.3vw",
              }}
              className="text-gray-900 space-x-2"
            >
              <span>{companyDetails.email},</span>
              <span>{companyDetails.phone}</span>
            </div>
          </div>
        </div> */}
        <span className="sr-only">Open Video</span>
        <div className="btn-thumbnail group-hover:hidden absolute inset-0 flex items-center justify-center w-full h-full bg-white bg-opacity-100 animate-pulse-full">
          {/* <svg
            className="pl-1 animate-pulse rounded-full border-primary-500"
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
          </svg> */}
          <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-50">
            <div
              className="flex group-hover:hidden flex-col justify-center items-center w-full h-full"
              style={{ fontSize: "1.7vw" }}
            >
              <div className="font-bold text-primary-600">
                {companyDetails.name}
              </div>
              <div
                style={{ fontSize: "1vw", maxWidth: "25vw" }}
                className="text-gray-900"
              >
                {companyDetails.website}
              </div>
              <div
                style={{
                  fontSize: "0.9vw",
                  maxWidth: "25vw",
                  marginTop: "0.3vw",
                }}
                className="text-gray-900 space-x-2"
              >
                <span>{companyDetails.email},</span>
                <span>{companyDetails.phone}</span>
              </div>
            </div>
          </div>
        </div>
      </button>
    </div>
  );
};
