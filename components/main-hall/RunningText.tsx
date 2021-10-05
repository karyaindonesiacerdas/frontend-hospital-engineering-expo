import React from "react";
import Marquee from "react-fast-marquee";
import styles from "./RunningText.module.css";

export const RunningText = () => {
  return (
    <div className={styles.runningText}>
      <div className=" bg-white bg-opacity-10 text-white rounded-md overflow-hidden backdrop-filter backdrop-blur-xl">
        <Marquee speed={80} gradient={false} style={{ height: "2.6vw" }}>
          <div>The 2nd day of the event will be held on October 16, 2021!</div>
        </Marquee>
      </div>
    </div>
  );
};
