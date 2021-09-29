import reducer, {
  userSettingsActions,
  _userSettingsActions,
} from "./userSettings";

describe("userSettingsSlice", () => {
  it("should return the initial state", () => {
    expect(reducer(undefined, {})).toEqual({});
  });

  it("should set user settings", () => {
    const settings = { name: "user", value: 1234 };
    expect(reducer({}, _userSettingsActions.setSettings(settings))).toEqual({
      name: "user",
      value: 1234,
    });
  });

  it("should toggle is watching value", () => {
    const prevState = { name: "user", value: 1234, isWatching: false };
    expect(reducer(prevState, userSettingsActions.toggleIsWatching())).toEqual({
      name: "user",
      value: 1234,
      isWatching: true,
    });
  });

  it("should delete watching ticker", () => {
    const prevState = {
      avalTickers: null,
      watchingTickers: ["TSLA", "GOOGL", "FCB"],
    };
    const tickerToDelete = {
      ticker: "TSLA",
      lastTickerData: {
        price: 234,
        change: 65,
      },
    };
    expect(
      reducer(
        prevState,
        _userSettingsActions.deleteWatchingTicker(tickerToDelete)
      )
    ).toEqual({
      avalTickers: {
        TSLA: [
          {
            price: 234,
            change: 65,
          },
        ],
      },
      watchingTickers: ["GOOGL", "FCB"],
    });
  });

  it("should add watching ticker", () => {
    const prevState = {
      avalTickers: {
        TSLA: [
          {
            price: 234,
            change: 65,
          },
        ],
      },
      watchingTickers: ["GOOGL", "FCB"],
    };
    const action = {
      type: "userSettings/addTicker/fulfilled",
      payload: "TSLA",
    };
    expect(reducer(prevState, action)).toEqual({
      watchingTickers: ["GOOGL", "FCB", "TSLA"],
      avalTickers: {},
    });
  });

  it("should should set updateInterval value", () => {
    const prevState = {
      updateInterval: 5000,
    };
    const action = {
      type: "userSettings/setUpdateInterval/fulfilled",
      payload: 8000,
    };
    expect(reducer(prevState, action)).toEqual({
      updateInterval: 8000,
    });
  });
});
