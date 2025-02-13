import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: (localStorage.getItem("theme") as "light" | "dark") ?? "light",
};

export const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    toggleTheme(state) {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
  },
});

export const { toggleTheme } = settingsSlice.actions;
export const settingsReduce = settingsSlice.reducer;
