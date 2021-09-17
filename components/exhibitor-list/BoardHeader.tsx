import React from "react";
import styles from "./BoardHeader.module.css";

export const BoardHeader = () => {
  return (
    <div className={styles.header}>
      <div className="w-full h-full">
        <div className="text-gray-700 text-center">Exhibitors & Sponsors</div>
      </div>
    </div>
  );
};
