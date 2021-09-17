import React from "react";
import styles from "./Banner1.module.css";

type Props = {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  card: {
    src: string;
  };
};

export const Banner1 = ({ card, onClick }: Props) => {
  return (
    // banner-1-wrapper group
    <div className="group">
      <div className={styles.bannerWrapper}>
        <button
          onClick={onClick}
          className={styles.banner}
          style={{ backgroundImage: card?.src ? `url(${card?.src})` : "none" }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-50 group-hover:bg-opacity-80"></div>
          <span className="text-white z-10 font-bold text-center">
            Download Name Card
          </span>
        </button>
      </div>
    </div>
  );
};
