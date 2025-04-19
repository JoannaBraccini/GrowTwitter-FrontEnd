import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Like, Retweet, Tweet, TweetType } from "../../../@types";
import { getTweetDetails } from "./tweetsActions";
import { ResponseApi } from "../../../configs/services/api.service";

interface InitialState {
  ok: boolean;
  message: string;
  loading: boolean;
  tweet: {
    id: string;
    userId: string;
    tweetType: TweetType;
    parentId?: string;
    content?: string;
    imageUrl?: string;
    createdAt: string;
    updatedAt?: string;

    likeCount?: number;
    replyCount?: number;
    retweetCount?: number;

    likes: Like[];
    retweets: Retweet[];
    replies: Tweet[];
  };
}

const initialState: InitialState = {
  ok: false,
  message: "",
  loading: false,
  tweet: {
    id: "",
    userId: "",
    tweetType: "TWEET",
    parentId: undefined,
    content: "",
    imageUrl: "",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),

    likeCount: undefined,
    replyCount: undefined,
    retweetCount: undefined,

    likes: [
      {
        id: "",
        tweetId: "",
        userId: "",
        likeCount: undefined,
        createdAt: new Date().toISOString(),
      },
    ],
    retweets: [
      {
        id: "",
        tweetId: "",
        userId: "",
        retweetCount: undefined,
        createdAt: new Date().toISOString(),
      },
    ],
    replies: [],
  },
};

const tweetDetailsSlice = createSlice({
  name: "tweetDetails",
  initialState,
  reducers: {
    setTweetDetails(state, action: PayloadAction<Tweet>) {
      return {
        ...state,
        ...action.payload,
      };
    },
    // Reset
    resetTweetDetails() {
      return initialState;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getTweetDetails.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        getTweetDetails.fulfilled,
        (state, action: PayloadAction<ResponseApi<Tweet>>) => {
          state.loading = false;
          state.ok = action.payload.ok;
          state.message = action.payload.message;

          if (action.payload.ok && action.payload.data) {
            const tweetData = action.payload.data;
            state.tweet = {
              ...tweetData,
              createdAt: new Date(tweetData.createdAt).toISOString(),
              updatedAt: tweetData.updatedAt
                ? new Date(tweetData.updatedAt).toISOString()
                : undefined, // Garantir que seja undefined caso não exista
            };
          }
        }
      )
      .addCase(getTweetDetails.rejected, (state, action) => {
        state.loading = false;
        state.ok = false;
        state.message = action.error.message || "Erro ao buscar dados do Tweet";
      });
  },
});

export const { resetTweetDetails, setTweetDetails } = tweetDetailsSlice.actions;
export const tweetDetailsReducer = tweetDetailsSlice.reducer;
