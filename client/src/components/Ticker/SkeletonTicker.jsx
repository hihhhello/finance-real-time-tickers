import React from "react";
import classNames from "classnames";
import styles from "./ticker.module.scss";

export const SkeletonTicker = ({ ticker }) => (
  <div className={classNames(styles.wrapper, styles.wrapperSkeleton)}>
    <div
      className={classNames(styles.tickWrapper, styles.tickWrapperSkeleton)}
    ></div>
    <div className={classNames(styles.textWrapper, styles.textWrapperSkeleton)}>
      <span
        className={classNames(styles.name, {
          [styles.nameSkeleton]: !ticker && true,
        })}
      >
        {ticker}
      </span>
      <span className={classNames(styles.price, styles.priceSkeleton)}></span>
    </div>
    <div
      className={classNames(styles.changeWrapper, styles.changeWrapperSkeleton)}
    >
      <span
        className={classNames(
          styles.changePercent,
          styles.changePercentSkeleton
        )}
      ></span>
      <span className={classNames(styles.change, styles.changeSkeleton)}></span>
    </div>
  </div>
);
