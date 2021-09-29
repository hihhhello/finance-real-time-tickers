import reducer, { tickersActions, _tickersActions } from "./tickers";

describe("tickersSlice", () => {
  it("should return initial state", () => {
    expect(reducer(undefined, {})).toEqual({
      tickers: null,
    });
  });

  it("should set tickers", () => {
    const tickers = [
      {
        ticker: "TSLA",
        exchange: "NASDAQ",
        price: "276.43",
        change: "-105.18",
        changePercent: "-0.90",
        dividend: "0.11",
        yield: "1.23",
        last_trade_time: "2021-09-28T12:47:55.000Z",
      },
      {
        ticker: "GOOGL",
        exchange: "NASDAQ",
        price: "173.29",
        change: "-52.05",
        change_percent: "-0.67",
        dividend: "0.86",
        yield: "1.70",
        last_trade_time: "2021-09-28T12:48:25.000Z",
      },
    ];
    const prevState = { tickers: null };
    expect(reducer(prevState, tickersActions.setTickers(tickers))).toEqual({
      tickers: {
        TSLA: [
          {
            exchange: "NASDAQ",
            price: "276.43",
            change: "-105.18",
            changePercent: "-0.90",
            dividend: "0.11",
            yield: "1.23",
            lastTradeTime: "2021-09-28T12:47:55.000Z",
          },
        ],
        GOOGL: [
          {
            exchange: "NASDAQ",
            price: "173.29",
            change: "-52.05",
            changePercent: "-0.67",
            dividend: "0.86",
            yield: "1.70",
            lastTradeTime: "2021-09-28T12:48:25.000Z",
          },
        ],
      },
    });
  });
  it("should add ticker", () => {
    const newTicker = {
      ticker: "MSFT",
      tickerData: [
        {
          exchange: "NASDAQ",
          price: "256.31",
          change: "-60.68",
          changePercent: "-0.31",
          dividend: "0.67",
          yield: "0.77",
          lastTradeTime: "2021-09-28T12:48:25.000Z",
        },
      ],
    };
    const prevState = {
      tickers: {
        TSLA: [
          {
            exchange: "NASDAQ",
            price: "276.43",
            change: "-105.18",
            changePercent: "-0.90",
            dividend: "0.11",
            yield: "1.23",
            lastTradeTime: "2021-09-28T12:47:55.000Z",
          },
        ],
        GOOGL: [
          {
            exchange: "NASDAQ",
            price: "173.29",
            change: "-52.05",
            changePercent: "-0.67",
            dividend: "0.86",
            yield: "1.70",
            lastTradeTime: "2021-09-28T12:48:25.000Z",
          },
        ],
      },
    };
    expect(
      reducer(prevState, _tickersActions.addWatchingTicker(newTicker))
    ).toEqual({
      tickers: {
        TSLA: [
          {
            exchange: "NASDAQ",
            price: "276.43",
            change: "-105.18",
            changePercent: "-0.90",
            dividend: "0.11",
            yield: "1.23",
            lastTradeTime: "2021-09-28T12:47:55.000Z",
          },
        ],
        GOOGL: [
          {
            exchange: "NASDAQ",
            price: "173.29",
            change: "-52.05",
            changePercent: "-0.67",
            dividend: "0.86",
            yield: "1.70",
            lastTradeTime: "2021-09-28T12:48:25.000Z",
          },
        ],
        MSFT: [
          {
            exchange: "NASDAQ",
            price: "256.31",
            change: "-60.68",
            changePercent: "-0.31",
            dividend: "0.67",
            yield: "0.77",
            lastTradeTime: "2021-09-28T12:48:25.000Z",
          },
        ],
      },
    });
  });

  it("should delete ticker", () => {
    const tickerToDelete = "GOOGL";
    const action = {
      type: "tickers/deleteTicker/fulfilled",
      payload: tickerToDelete,
    };
    const tickers = {
      TSLA: [
        {
          exchange: "NASDAQ",
          price: "276.43",
          change: "-105.18",
          changePercent: "-0.90",
          dividend: "0.11",
          yield: "1.23",
          lastTradeTime: "2021-09-28T12:47:55.000Z",
        },
      ],
      GOOGL: [
        {
          exchange: "NASDAQ",
          price: "173.29",
          change: "-52.05",
          changePercent: "-0.67",
          dividend: "0.86",
          yield: "1.70",
          lastTradeTime: "2021-09-28T12:48:25.000Z",
        },
      ],
    };
    expect(reducer({ tickers }, action)).toEqual({
      tickers: {
        TSLA: [
          {
            exchange: "NASDAQ",
            price: "276.43",
            change: "-105.18",
            changePercent: "-0.90",
            dividend: "0.11",
            yield: "1.23",
            lastTradeTime: "2021-09-28T12:47:55.000Z",
          },
        ],
      },
    });
  });
});
