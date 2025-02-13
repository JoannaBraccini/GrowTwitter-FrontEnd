import { createSlice } from "@reduxjs/toolkit";
import { Tweet } from "../../../types";
import {
  createTweet,
  deleteTweet,
  getTweets,
  updateTweet,
} from "./tweetsActions";

interface InitialState {
  ok: boolean;
  message: string;
  loading: boolean;
  tweets: Tweet[];
}

const initialState: InitialState = {
  ok: false,
  message: "",
  loading: false,
  tweets: [],
};

const tweetsSlice = createSlice({
  name: "tweets",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(createTweet.pending, (state) => {
        state.loading = true;
      })
      .addCase(createTweet.fulfilled, (state, action) => {
        state.loading = false;
        state.ok = action.payload.ok;
        state.message = action.payload.message;

        if (state.ok && action.payload.data) {
          state.tweets.push(action.payload.data);
        }
      })
      .addCase(createTweet.rejected, (state, action) => {
        state.loading = false;
        state.ok = false;
        state.message = action.error.message || "Erro ao criar Tweet";
      });

    builder
      .addCase(getTweets.pending, (state) => {
        state.loading = true;
      })
      .addCase(getTweets.fulfilled, (state, action) => {
        state.loading = false;
        state.ok = action.payload.ok;
        state.message = action.payload.message;

        if (state.ok && action.payload.data) {
          state.tweets = action.payload.data;
        }
      })
      .addCase(getTweets.rejected, (state, action) => {
        state.loading = false;
        state.ok = false;
        state.message = action.error.message || "Erro ao buscar Tweets";
      });

    builder
      .addCase(updateTweet.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateTweet.fulfilled, (state, action) => {
        state.loading = false;
        state.ok = action.payload.ok;
        state.message = action.payload.message;

        if (state.ok && action.payload.data) {
          const index = state.tweets.findIndex(
            (tweet) => tweet.id === action.payload.data?.id
          );

          if (index !== -1) {
            state.tweets[index] = {
              ...state.tweets[index],
              ...action.payload.data,
            };
          }
        }
      })
      .addCase(updateTweet.rejected, (state, action) => {
        state.loading = false;
        state.ok = false;
        state.message =
          action.error.message || "Erro ao atualizar conteúdo do Tweet";
      });

    builder
      .addCase(deleteTweet.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteTweet.fulfilled, (state, action) => {
        state.loading = false;
        state.ok = action.payload.ok;
        state.message = action.payload.message;

        if (state.ok && action.payload.data) {
          const index = state.tweets.findIndex(
            (tweet) => tweet.id === action.payload.data?.id
          );

          if (index !== -1) {
            state.tweets.splice(index, 1);
          }
        }
      })
      .addCase(deleteTweet.rejected, (state, action) => {
        state.loading = false;
        state.ok = false;
        state.message = action.error.message || "Erro ao deletar Tweet";
      });
  },
});

export const tweetsReducer = tweetsSlice.reducer;
