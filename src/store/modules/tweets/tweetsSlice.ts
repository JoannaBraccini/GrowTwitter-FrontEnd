import { Like, Retweet, Tweet } from "../../../@types";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import {
  createTweet,
  deleteTweet,
  getFeed,
  getTweets,
  likeTweet,
  retweetTweet,
  updateTweet,
} from "./tweetsActions";

import { ResponseApi } from "../../../configs/services/api.service";

interface InitialState {
  ok: boolean;
  message: string;
  loading: boolean;
  tweets: Tweet[]; // Para a aba "Para Você"
  feed: Tweet[]; // Para a aba "Seguindo"
}

const initialState: InitialState = {
  ok: false,
  message: "",
  loading: false,
  tweets: [],
  feed: [],
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
      .addCase(
        createTweet.fulfilled,
        (state, action: PayloadAction<ResponseApi<Tweet>>) => {
          state.loading = false;
          state.ok = action.payload.ok;
          state.message = action.payload.message;

          if (state.ok && action.payload.data) {
            state.tweets.push(action.payload.data);
          }
        }
      )
      .addCase(createTweet.rejected, (state, action) => {
        state.loading = false;
        state.ok = false;
        state.message = action.error.message || "Erro ao criar Tweet";
      });

    builder
      .addCase(likeTweet.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        likeTweet.fulfilled,
        (state, action: PayloadAction<ResponseApi<Like>>) => {
          state.loading = false;
          state.ok = action.payload.ok;
          state.message = action.payload.message;

          if (state.ok && action.payload.data) {
            const likedTweetIndex = state.tweets.findIndex(
              (tweet) => tweet.id === action.payload.data?.tweetId
            );

            if (likedTweetIndex !== -1) {
              const tweet = state.tweets[likedTweetIndex];
              const likeExists = tweet.likes.some(
                (like) => like.id === action.payload.data?.id
              );

              state.tweets[likedTweetIndex] = {
                ...tweet,
                likes: likeExists
                  ? tweet.likes.filter(
                      (like) => like.id !== action.payload.data?.id
                    ) // Remove o like
                  : [...tweet.likes, action.payload.data], // Add o like
              };
            }
          }
        }
      )
      .addCase(likeTweet.rejected, (state, action) => {
        state.loading = false;
        state.ok = false;
        state.message = action.error.message || "Erro no Like";
      });

    builder
      .addCase(retweetTweet.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        retweetTweet.fulfilled,
        (state, action: PayloadAction<ResponseApi<Retweet>>) => {
          state.loading = false;
          state.ok = action.payload.ok;
          state.message = action.payload.message;

          if (state.ok && action.payload.data) {
            const retweetIndex = state.tweets.findIndex(
              (tweet) => tweet.id === action.payload.data?.tweetId
            );

            if (retweetIndex !== -1) {
              state.tweets[retweetIndex] = {
                ...state.tweets[retweetIndex],
                retweets: [
                  ...state.tweets[retweetIndex].retweets,
                  action.payload.data,
                ], // Adiciona o retweet (com ou sem comentário)
              };
            }
          }
        }
      )
      .addCase(retweetTweet.rejected, (state, action) => {
        state.loading = false;
        state.ok = false;
        state.message = action.error.message || "Erro no Retweet";
      });

    builder
      .addCase(getTweets.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        getTweets.fulfilled,
        (state, action: PayloadAction<ResponseApi<Tweet[]>>) => {
          state.loading = false;
          state.ok = action.payload.ok;
          state.message = action.payload.message;

          if (state.ok && action.payload.data) {
            state.tweets = action.payload.data; // Atualiza tweets para "Para Você"
          }
        }
      )
      .addCase(getTweets.rejected, (state, action) => {
        state.loading = false;
        state.ok = false;
        state.message = action.error.message || "Erro ao buscar Tweets";
      });

    builder
      .addCase(getFeed.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        getFeed.fulfilled,
        (state, action: PayloadAction<ResponseApi<Tweet[]>>) => {
          state.loading = false;
          state.ok = action.payload.ok;
          state.message = action.payload.message;

          if (state.ok && action.payload.data) {
            state.feed = action.payload.data; // Atualiza feed para "Seguindo"
          }
        }
      )
      .addCase(getFeed.rejected, (state, action) => {
        state.loading = false;
        state.ok = false;
        state.message = action.error.message || "Erro ao buscar Feed";
      });

    builder
      .addCase(updateTweet.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        updateTweet.fulfilled,
        (state, action: PayloadAction<ResponseApi<Tweet>>) => {
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
        }
      )
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
      .addCase(
        deleteTweet.fulfilled,
        (state, action: PayloadAction<ResponseApi<Tweet>>) => {
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
        }
      )
      .addCase(deleteTweet.rejected, (state, action) => {
        state.loading = false;
        state.ok = false;
        state.message = action.error.message || "Erro ao deletar Tweet";
      });
  },
});

export const tweetsReducer = tweetsSlice.reducer;
