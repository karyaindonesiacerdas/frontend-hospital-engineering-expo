import React from "react";
import styles from "./Banner2.module.css";

export const Banner2 = () => {
  return (
    <div className="group">
      <div className={styles.bannerWrapper}>
        <a
          href="https://img.freepik.com/free-vector/product-catalogue-design-template_158274-283.jpg?size=626&ext=jpg"
          target="_blank"
          rel="noreferrer"
          download
          className={styles.banner}
          style={{ backgroundImage: "url('/catalog-example.PNG')" }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-50 group-hover:bg-opacity-80"></div>
          <span className="text-white z-10 font-bold text-center">
            Download Catalog
          </span>
        </a>
      </div>
    </div>
  );
};
