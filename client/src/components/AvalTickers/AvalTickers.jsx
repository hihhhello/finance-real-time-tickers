import React from "react";
import styles from "./aval-tickers.module.scss";
import cn from "classnames";
import { useSelector } from "react-redux";
import _ from "lodash";
import { useActions } from "../../hooks/useActions";
import { AvalTicker } from "../AvalTicker/AvalTicker";

export const AvalTickers = () => {
  const userSettings = useSelector((state) => state.userSettings);
  const { socket } = useSelector((state) => state.socket);
  const { isOpen } = useSelector((state) => state.sidebar);
  const { addTicker, toggleIsOpen } = useActions();
  const onAddTicker = (ticker) => {
    addTicker({ ticker, socket });
  };
  return (
    <div
      className={cn(styles.wrapper, {
        [styles.wrapperOpen]: isOpen,
      })}
    >
      <div className={styles.toggler} onClick={() => toggleIsOpen()}></div>
      <div className={styles.content}>
        <div className={styles.contentInner}>
          {!_.isEmpty(userSettings) && socket ? (
            !userSettings.avalTickers || _.isEmpty(userSettings.avalTickers) ? (
              <span className={styles.placeholder}>No available tickers</span>
            ) : (
              <div className={styles.tickers}>
                {Object.entries(userSettings.avalTickers).map(
                  ([ticker, [lastTickerData]]) => (
                    <AvalTicker
                      key={ticker}
                      ticker={ticker}
                      onClickHandler={() => onAddTicker(ticker)}
                    />
                  )
                )}
              </div>
            )
          ) : (
            <span className={styles.placeholder}>Loading...</span>
          )}
        </div>
      </div>
    </div>
  );
};
