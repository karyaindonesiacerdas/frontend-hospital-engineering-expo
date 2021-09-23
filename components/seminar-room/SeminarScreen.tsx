import React from "react";
import styles from "./SeminarScreen.module.css";

export const SeminarScreen = () => {
  const videoId = "i6veQ8MvNSM";
  return (
    <div className={styles.seminar}>
      <div>
        <iframe
          width="100%"
          height="100%"
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1`}
          title="YouTube video player"
          frameBorder="0"
          allow="autoplay; loop; fullscreen"
        ></iframe>
      </div>
    </div>
  );
};
