import { matchYoutubeUrl } from "utils";
import styles from "./Advertisement2.module.css";

export const Advertisement2 = ({ url }: { url?: string }) => {
  const defaultVideo =
    "https://www.youtube.com/watch?v=jS0qVrpKjY4&ab_channel=HospitalEngineeringExpo";

  const youtubeId = matchYoutubeUrl(url || defaultVideo);

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
