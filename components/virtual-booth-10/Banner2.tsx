import React from "react";
import styles from "./Banner2.module.css";

// type Props = {
//   src?: string;
// };

type Props = {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
};

export const Banner2 = ({ onClick }: Props) => {
  return (
    <div className="group">
      <div className={styles.bannerWrapper}>
        <button
          onClick={onClick}
          className={styles.banner}
          style={{ backgroundImage: "url('/catalog-example.PNG')" }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-50 group-hover:bg-opacity-80"></div>
          <span className="text-white z-10 font-bold text-center">
            Download Catalog
          </span>
        </button>
      </div>
    </div>
  );
};
