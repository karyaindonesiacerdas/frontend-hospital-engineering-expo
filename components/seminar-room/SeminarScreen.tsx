import React from "react";
import styles from "./SeminarScreen.module.css";

export const SeminarScreen = () => {
  const videoId = "jS0qVrpKjY4";
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
        {/* <iframe
          width="100%"
          height="100%"
          src="https://www.youtube.com/embed/Mp-rGsO5sdA"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe> */}
      </div>
    </div>
  );
};
