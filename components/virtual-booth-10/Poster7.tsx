import React from "react";
import styles from "./Poster7.module.css";

export const Poster7 = () => {
  return (
    <div className="group">
      <div className={styles.posterWrapper}>
        <button
          className={styles.poster}
          style={{ backgroundImage: "url('/brosur2.jpg')" }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-50 group-hover:bg-opacity-80"></div>
          <span className="text-white z-10 font-bold">Product 6</span>
        </button>
      </div>
    </div>
  );
};
