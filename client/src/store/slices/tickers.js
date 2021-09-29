import _ from "lodash";
import { _userSettingsActions } from "../slices/userSettings";
const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");
const { TickerItem } = require("../../models/TickerItem");

const deleteTicker = createAsyncThunk(
  "tickers/deleteTicker",
  async ({ ticker, socket }, thunkAPI) => {
    /**
     * Deleting ticker from tickers and userSetting states
     * @param ticker The name of ticker to delete
     */
    const { tickers } = thunkAPI.getState();
    const tickerData = tickers.tickers[ticker];
    await thunkAPI.dispatch(
      _userSettingsActions.deleteWatchingTicker({
        ticker,
        lastTickerData: tickerData[0],
      })
    );

    socket.emit(
      "update-watching-tickers",
      Object.keys(tickers.tickers).filter((t) => t !== ticker)
    );

    return ticker;
  }
);

const tickersSlice = createSlice({
  name: "tickers",
  initialState: {
    tickers: null,
  },
  reducers: {
    setTickers(state, action) {
      if (_.isNull(action.payload)) {
        state.tickers = {};
        return;
      }
      action.payload.forEach(({ ticker, ...data }) => {
        // creating initial object
        if (_.isNull(state.tickers)) {
          state.tickers = {};
        }
        if (!state.tickers[ticker]) {
          state.tickers[ticker] = [TickerItem.propsToCamelCase(data)];
          return;
        }
        state.tickers[ticker].unshift(TickerItem.propsToCamelCase(data));
      });
    },
    addWatchingTicker(state, action) {
      const { ticker, tickerData } = action.payload;
      if (_.isNull(state.tickers)) {
        state.tickers = {};
      }
      state.tickers[ticker] = tickerData;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(deleteTicker.fulfilled, (state, action) => {
      const ticker = action.payload;
      delete state.tickers[ticker];
    });
  },
});

/**
 * @_actions dispatches at other actions only
 */

export default tickersSlice.reducer;
const {
  actions: { setTickers, addWatchingTicker },
} = tickersSlice;
export const tickersActions = {
  setTickers,
  deleteTicker,
};

export const _tickersActions = {
  addWatchingTicker,
};
