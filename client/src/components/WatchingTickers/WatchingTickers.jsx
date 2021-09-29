import React from "react";
import _ from "lodash";
import Ticker from "../Ticker";

import styles from "./watching-tickers.module.scss";
import { useActions } from "../../hooks/useActions";
import { useSelector } from "react-redux";
import { SkeletonTicker } from "../Ticker/SkeletonTicker";

const TickersSkeleton = () => {
  const placeholder = [];
  for (let i = 0; i < 6; i++) {
    placeholder.push(<Ticker key={i} skeleton />);
  }
  return placeholder;
};

export const WatchingTickers = () => {
  const { deleteTicker } = useActions();
  const { tickers } = useSelector((state) => state.tickers);
  const { socket } = useSelector((state) => state.socket);
  const userSettings = useSelector((state) => state.userSettings);

  const onDeleteTicker = (ticker) => {
    deleteTicker({ ticker, socket });
  };
  return (
    <div className={styles.wrapper}>
      {_.isNull(tickers) && userSettings && userSettings.isWatching ? (
        <TickersSkeleton />
      ) : userSettings.watchingTickers &&
        userSettings.watchingTickers.length &&
        !userSettings.isWatching &&
        _.isNull(tickers) ? (
        userSettings.watchingTickers.map((t) => (
          <SkeletonTicker key={t} ticker={t} />
        ))
      ) : _.isEmpty(tickers) ? (
        <div className={styles.placeholder}>
          <span>No watching tickers</span>
        </div>
      ) : (
        Object.entries(tickers).map(([ticker, [lastTickerData]]) => (
          <Ticker
            key={ticker}
            ticker={ticker}
            {...lastTickerData}
            onClickHandler={onDeleteTicker}
          />
        ))
      )}
    </div>
  );
};
