import React from "react";
import styles from "./Poster10.module.css";

export const Poster10 = () => {
  return (
    <div className="group">
      <div className={styles.posterWrapper}>
        <button
          className={styles.poster}
          style={{ backgroundImage: "url('./brosur5.jpg')" }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-50 group-hover:bg-opacity-80"></div>
          <span className="text-white z-10 font-bold">Product 9</span>
        </button>
      </div>
    </div>
  );
};
