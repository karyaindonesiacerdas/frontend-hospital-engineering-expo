import React from "react";
import styles from "./NameCard.module.css";
import type { Banner } from "types";

type Props = {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  banner?: Banner;
};

export const NameCard = ({ banner, onClick }: Props) => {
  return (
    // banner-1-wrapper group
    <div className="group">
      <div className={styles.bannerWrapper}>
        <button
          onClick={onClick}
          className={styles.banner}
          style={{
            backgroundImage: banner?.image
              ? `url(${process.env.NEXT_PUBLIC_STORAGE_URL}/banner/${banner?.image})`
              : "none",
          }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-50 group-hover:bg-opacity-80"></div>
          <span className="text-white z-10 font-bold text-center">
            {banner?.image ? "Download Name Card" : "Empty"}
          </span>
        </button>
      </div>
    </div>
  );
};
