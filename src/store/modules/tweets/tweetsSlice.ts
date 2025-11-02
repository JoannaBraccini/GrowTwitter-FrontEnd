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

/**
 * Função para buscar o tweet-pai de um retweet.
 * @param tweets Lista de tweets disponíveis no estado.
 * @param retweet Retweet que contém o ID do tweet-pai.
 * @returns O tweet-pai, se encontrado, ou undefined.
 */
export const findParentTweet = (
  tweets: Tweet[],
  retweet: Retweet
): Tweet | undefined => {
  return tweets.find((tweet) => tweet.id === retweet.tweetId);
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

              // Garante que likes existe (array vazio se undefined)
              const currentLikes = tweet.likes || [];
              const likeExists = currentLikes.some(
                (like) => like.userId === action.payload.data?.userId
              );

              // Atualiza o estado com base na resposta do backend
              state.tweets[likedTweetIndex] = {
                ...tweet,
                likes: likeExists
                  ? currentLikes.filter(
                      (like) => like.userId !== action.payload.data?.userId
                    ) // Remove o like
                  : [...currentLikes, action.payload.data], // Adiciona o like
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
        (state, action: PayloadAction<ResponseApi<Tweet> | undefined>) => {
          state.loading = false;

          if (action.payload) {
            state.ok = action.payload.ok;
            state.message = action.payload.message;

            if (state.ok && action.payload.data) {
              const index = state.tweets.findIndex(
                (tweet) => tweet.id === action.payload?.data?.id
              );

              if (index !== -1) {
                state.tweets[index] = {
                  ...state.tweets[index],
                  ...action.payload.data,
                };
              }
            }
          } else {
            state.ok = false;
            state.message = "Erro ao atualizar conteúdo do Tweet";
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
        (state, action: PayloadAction<ResponseApi<Tweet> | undefined>) => {
          state.loading = false;

          if (action.payload) {
            state.ok = action.payload.ok;
            state.message = action.payload.message;

            if (state.ok && action.payload.data) {
              const index = state.tweets.findIndex(
                (tweet) => tweet.id === action.payload?.data?.id
              );

              if (index !== -1) {
                state.tweets.splice(index, 1);
              }
            }
          } else {
            state.ok = false;
            state.message = "Erro ao deletar Tweet";
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
