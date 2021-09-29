import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { _tickersActions } from "../slices/tickers";
import _ from "lodash";
import { toast } from "react-toastify";

/**
 *
 * The initial state sets after cheking cookies. (default or saved settings)
 * If we had the initial state, so default value of the input
 * for updateInterval wouldn't set to the value from cookies.
 *
 *
 * fields:
 *    isWatching: boolean,
 *    avalTickers: {},
 *    watchingTickers: [],
 *    updateInterval: number,
 *
 */

const addTicker = createAsyncThunk(
  "userSettings/addTicker",
  async ({ ticker, socket }, thunkAPI) => {
    const { userSettings } = thunkAPI.getState();
    const { tickers } = thunkAPI.getState();
    const tickerData = userSettings.avalTickers[ticker];
    if (!_.isNull(tickers.tickers)) {
      thunkAPI.dispatch(
        _tickersActions.addWatchingTicker({ ticker, tickerData })
      );
    }
    socket.emit("update-watching-tickers", [
      ...userSettings.watchingTickers,
      ticker,
    ]);
    return ticker;
  }
);

const setUpdateInterval = createAsyncThunk(
  "userSettings/setUpdateInterval",
  async ({ value, socket }, thunkAPI) => {
    const interval = +Number(value).toFixed(0);

    socket.emit("update-interval", interval);
    return value;
  }
);

const userSettingsSlice = createSlice({
  name: "userSettings",
  initialState: {},
  reducers: {
    setSettings(state, action) {
      return {
        ...action.payload,
      };
    },
    toggleIsWatching(state) {
      state.isWatching = !state.isWatching;
    },
    deleteWatchingTicker(state, action) {
      const { ticker, lastTickerData } = action.payload;
      const tickerInd = state.watchingTickers.indexOf(ticker);
      state.watchingTickers = [
        ...state.watchingTickers.slice(0, tickerInd),
        ...state.watchingTickers.slice(tickerInd + 1),
      ];
      if (!_.isNull(state.avalTickers)) {
        state.avalTickers[ticker] = [lastTickerData];
      } else {
        state.avalTickers = {
          [ticker]: [lastTickerData],
        };
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addTicker.fulfilled, (state, action) => {
        state.watchingTickers.push(action.payload);
        state.watchingTickers.sort((a, b) => a - b);
        delete state.avalTickers[action.payload];
      })
      .addCase(setUpdateInterval.fulfilled, (state, action) => {
        state.updateInterval = action.payload;
        toast.success(`Update interval changed to ${action.payload}ms`);
      });
  },
});

export default userSettingsSlice.reducer;
const {
  toggleIsWatching,

  addWatchingTicker,
  setSettings,
  deleteWatchingTicker,
} = userSettingsSlice.actions;

export const userSettingsActions = {
  toggleIsWatching,
  setUpdateInterval,
  addTicker,
};

export const _userSettingsActions = {
  addWatchingTicker,
  deleteWatchingTicker,
  setSettings,
};
