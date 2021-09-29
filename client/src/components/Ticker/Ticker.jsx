import React, { useRef } from "react";
import classNames from "classnames";
import { SwitchTransition, CSSTransition } from "react-transition-group";
import { useSelector } from "react-redux";

import { formatNumSybmol } from "../../utils/formatNumSybmol";

import { SkeletonTicker } from "./SkeletonTicker";
import { ReactComponent as ArrowUp } from "../../icons/arrow-up-solid.svg";
import { ReactComponent as ArrowDown } from "../../icons/arrow-down-solid.svg";

import styles from "./ticker.module.scss";

const ScrollAnimation = ({ children, keyValue, elemRef }) => {
  return (
    <SwitchTransition mode={"out-in"}>
      <CSSTransition
        nodeRef={elemRef}
        key={keyValue}
        timeout={200}
        classNames={{
          enterActive: styles.scrollEnterActive,
          exitActive: styles.scrollExitActive,
        }}
      >
        {children}
      </CSSTransition>
    </SwitchTransition>
  );
};

export const Ticker = ({
  ticker,
  // exchange,
  price,
  change,
  changePercent,
  onClickHandler,
  skeleton = false,
}) => {
  const { isWatching } = useSelector((state) => state.userSettings);
  const isLoss = +change && +changePercent < 0;
  const priceRef = useRef();
  const changeRef = useRef();
  const changePercentRef = useRef();
  return (
    <>
      {skeleton ? (
        <SkeletonTicker ticker={ticker} />
      ) : (
        <div
          className={classNames(styles.wrapper, {
            [styles.wrapperLoss]: isLoss,
            [styles.wrapperPaused]: !isWatching,
          })}
          onClick={() => onClickHandler(ticker)}
        >
          <div
            className={classNames(styles.tickWrapper, {
              [styles.tickWrapperLoss]: isLoss,
            })}
          >
            {isLoss ? (
              <ArrowDown className={styles.tick} />
            ) : (
              <ArrowUp className={styles.tick} />
            )}
          </div>
          <div className={styles.textWrapper}>
            <div className={styles.name}>{ticker}</div>
            <div className={styles.priceWrapper}>
              <ScrollAnimation keyValue={price} elemRef={priceRef}>
                <div ref={priceRef} className={styles.price}>
                  {Intl.NumberFormat("ru-RU").format(price)}
                </div>
              </ScrollAnimation>
            </div>
          </div>
          <div className={styles.changeWrapper}>
            <div className={styles.changePercentWrapper}>
              <ScrollAnimation
                elemRef={changePercentRef}
                keyValue={changePercent}
              >
                <div
                  ref={changePercentRef}
                  className={styles.changePercent}
                >{`${formatNumSybmol(changePercent)}`}</div>
              </ScrollAnimation>
            </div>
            <div className={styles.changePriceWrapper}>
              <ScrollAnimation keyValue={change} elemRef={changeRef}>
                <div ref={changeRef} className={styles.change}>
                  {formatNumSybmol(change)}
                </div>
              </ScrollAnimation>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
