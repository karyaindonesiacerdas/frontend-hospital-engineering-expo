import React from "react";
import styles from "./Advertisement2.module.css";

export const Advertisement2 = () => {
  const videoId = "i6veQ8MvNSM";

  return (
    <div className={styles.advertisement}>
      <div>
        <iframe
          width="100%"
          height="100%"
          src={`https://www.youtube.com/embed/${videoId}?version=3&autoplay=1&mute=1&loop=1`}
          title="YouTube video player"
          frameBorder="0"
          allow="autoplay; loop; fullscreen"
        ></iframe>
      </div>
    </div>
  );
};
