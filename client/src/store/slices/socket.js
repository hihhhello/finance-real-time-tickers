import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { io } from "socket.io-client";
import { BASE_URL } from "../../consts/url";
import { tickersActions } from "./tickers";
import { _userSettingsActions } from "./userSettings";

const setUserSettings = createAsyncThunk(
  "socket/setUserSettings",
  async (settings, thunkAPI) => {
    const socket = await io(BASE_URL);
    thunkAPI.dispatch(_userSettingsActions.setSettings(settings));
    if (!settings.watchingTickers.length) {
      thunkAPI.dispatch(tickersActions.setTickers(null));
    }
    return socket;
  }
);

const socket = createSlice({
  name: "socket",
  initialState: {
    socket: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(setUserSettings.fulfilled, (state, action) => {
      state.socket = action.payload;
    });
  },
});

export default socket.reducer;
export const {} = socket.actions;
export const socketActions = {
  setUserSettings,
};
