import { useSettings } from "hooks/useSettings";
import React from "react";
import { youtubeParser } from "utils";
import styles from "./SeminarScreen.module.css";

export const SeminarScreen = () => {
  const defaultVideo =
    "https://www.youtube.com/watch?v=jS0qVrpKjY4&ab_channel=HospitalEngineeringExpo";

  const { data } = useSettings();

  const youtubeId =
    youtubeParser(data?.youtube_link || defaultVideo) || "jS0qVrpKjY4";

  return (
    <div className={styles.seminar}>
      <div>
        <iframe
          width="100%"
          height="100%"
          src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&mute=1&loop=1`}
          title="YouTube video player"
          frameBorder="0"
          allow="autoplay; loop; fullscreen"
        ></iframe>
      </div>
    </div>
  );
};
