import React from "react";
import styles from "./aval-ticker.module.scss";
export const AvalTicker = ({ ticker, onClickHandler }) => {
  return (
    <div
      onClick={onClickHandler}
      className={styles.wrapper}
      data-ticker={ticker}
    >
      <span className={styles.ticker}>{ticker}</span>
    </div>
  );
};
