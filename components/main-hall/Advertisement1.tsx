import React from "react";
import { youtubeParser } from "utils";
import styles from "./Advertisement1.module.css";

export const Advertisement1 = ({ url }: { url?: string }) => {
  const defaultVideo =
    "https://www.youtube.com/watch?v=jS0qVrpKjY4&ab_channel=HospitalEngineeringExpo";

  const youtubeId = youtubeParser(url || defaultVideo) || "jS0qVrpKjY4";

  return (
    <div className={styles.advertisement}>
      <div>
        <iframe
          width="100%"
          height="100%"
          src={`https://www.youtube.com/embed/${youtubeId}?version=3&autoplay=1&mute=1&loop=1`}
          title="YouTube video player"
          frameBorder="0"
          allow="autoplay; loop; fullscreen"
        ></iframe>
      </div>
    </div>
  );
};
