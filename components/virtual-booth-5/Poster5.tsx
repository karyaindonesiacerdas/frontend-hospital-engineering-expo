import React from "react";
import styles from "./Poster5.module.css";
import type { Poster } from "./type";

type Props = {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  poster?: Poster;
};

export const Poster5 = ({ onClick, poster }: Props) => {
  return (
    <div className="group">
      <div className={styles.posterWrapper}>
        <button
          onClick={onClick}
          className={styles.poster}
          style={{
            backgroundImage: poster?.src ? `url(${poster?.src})` : "none",
          }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-50 group-hover:bg-opacity-80"></div>
          <span className="text-white z-10 font-bold">
            {poster?.title || "Empty"}
          </span>
        </button>
      </div>
    </div>
  );
};
