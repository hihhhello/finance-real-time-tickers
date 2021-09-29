import React from "react";
import WatchingTickers from "../WatchingTickers";
import Toggler from "../Toggler";
import IntervalInput from "../IntervalInput";

/**
 * @property avalTickers - is list of availables tickers
 */

export const TickersPanel = () => {
  return (
    <div className="container">
      <WatchingTickers />
      <Toggler />
      <IntervalInput />
    </div>
  );
};
