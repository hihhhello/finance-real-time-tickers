import { Provider } from "react-redux";
import { combineReducers, createStore } from "redux";
import { render } from "@testing-library/react";
import reducers from "../store/slices";

export const renderWithRedux = (
  component,
  {
    initialState,
    store = createStore(combineReducers(reducers), initialState),
  } = {}
) => {
  return {
    ...render(<Provider store={store}>{component}</Provider>),
    store,
  };
};
