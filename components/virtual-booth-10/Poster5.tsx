import React from "react";
import styles from "./Poster5.module.css";
import type { Banner } from "types";

type Props = {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  banner?: Banner;
};

export const Poster5 = ({ onClick, banner }: Props) => {
  return (
    <div className="group">
      <div className={styles.posterWrapper}>
        <button
          onClick={onClick}
          className={styles.poster}
          style={{
            backgroundImage: banner?.image
              ? `url(${process.env.NEXT_PUBLIC_STORAGE_URL}/banner/${banner?.image})`
              : "none",
          }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-50 group-hover:bg-opacity-80"></div>
          <span className="text-white z-10 font-bold">
            {banner?.display_name || "Empty"}
          </span>
        </button>
      </div>
    </div>
  );
};
