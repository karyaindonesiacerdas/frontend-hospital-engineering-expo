/* eslint-disable @next/next/no-img-element */
import React from "react";
import styles from "./SeminarTitle.module.css";

export const SeminarTitle = () => {
  return (
    <div className={styles.title}>
      <div className="md:rounded-lg transform -translate-y-3 sm:translate-y-0 bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg flex items-center justify-center md:p-1">
        <h2 className="bg-primary-500 text-white w-full text-center md:rounded-lg font-bold">
          Welcome Speech
        </h2>
      </div>
    </div>
  );
};
