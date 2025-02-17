import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchTrendsFromAPI } from "../../../configs/services/trends.service";
import { Trend } from "../../../types/trends.type";

// Thunk assíncrono
export const fetchTrends = createAsyncThunk("trends/fetchTrends", async () => {
  const trendsData = await fetchTrendsFromAPI();
  return trendsData;
});

interface TrendsState {
  trends: Trend[];
  loading: boolean;
  message: string;
}

const initialState: TrendsState = {
  trends: [],
  loading: false,
  message: "",
};

const trendsSlice = createSlice({
  name: "trends",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTrends.pending, (state) => {
        state.loading = true;
        state.message = "";
      })
      .addCase(fetchTrends.fulfilled, (state, action) => {
        state.trends = action.payload;
        state.loading = false;
      })
      .addCase(fetchTrends.rejected, (state) => {
        state.message = "Erro ao buscar trends";
        state.loading = false;
      });
  },
});

export const trendsReducer = trendsSlice.reducer;
