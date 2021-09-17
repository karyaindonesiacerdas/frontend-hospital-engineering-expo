import React from "react";
import styles from "./Banner1.module.css";

export const Banner1 = () => {
  return (
    // banner-1-wrapper group
    <div className="group">
      <div className={styles.bannerWrapper}>
        <a
          href="https://image.freepik.com/free-psd/blue-white-business-card_1435-1104.jpg"
          target="_blank"
          rel="noreferrer"
          download
          className={styles.banner}
          style={{ backgroundImage: "url('/name-card-example.png')" }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-50 group-hover:bg-opacity-80"></div>
          <span className="text-white z-10 font-bold text-center">
            Download Name Card
          </span>
        </a>
      </div>
    </div>
  );
};
