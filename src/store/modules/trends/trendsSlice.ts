import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Trend } from "../../../types";

interface TrendsState {
  trends: Trend[];
}

const initialState: TrendsState = {
  trends: [],
};

const trendsSlice = createSlice({
  name: "trends",
  initialState,
  reducers: {
    setTrends(state, action: PayloadAction<Trend[]>) {
      state.trends = action.payload;
    },
  },
});

export const { setTrends } = trendsSlice.actions;
export const trendsReducer = trendsSlice.reducer;
