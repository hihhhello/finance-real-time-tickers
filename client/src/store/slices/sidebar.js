import { createSlice } from "@reduxjs/toolkit";

const sidebarSlice = createSlice({
  name: "sidebar",
  initialState: {
    isOpen: false,
  },
  reducers: {
    toggleIsOpen(state, action) {
      return {
        isOpen: !state.isOpen,
      };
    },
  },
});

export default sidebarSlice.reducer;
export const { actions: sidebarActions } = sidebarSlice;
