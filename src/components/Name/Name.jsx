import React from "react";
import styles from "./Name.module.scss";

function Name() {
  return (
    <div>
      <svg viewBox="0 0 960 110">
        <symbol id="s-text">
          <text textAnchor="middle" x="50%" y="80%">
            KSHITIJ AGARWAL
          </text>
        </symbol>

        <g className="g-ants">
          <use xlinkHref="#s-text" className={styles["letter"]}></use>
          <use xlinkHref="#s-text" className={styles["letter"]}></use>
          <use xlinkHref="#s-text" className={styles["letter"]}></use>
          <use xlinkHref="#s-text" className={styles["letter"]}></use>
          <use xlinkHref="#s-text" className={styles["letter"]}></use>
        </g>
      </svg>
    </div>
  );
}

export default Name;
