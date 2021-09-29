import { combineReducers } from "redux";

import { configureStore } from "@reduxjs/toolkit";
import reducers from "./slices";
const rootReducer = combineReducers(reducers);

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["socket/setUserSettings/fulfilled"],
        ignoredPaths: ["socket"],
      },
    }),
});
