import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Actions, Tweet, TweetType } from "../../../types";
import { getTweetDetails } from "./tweetsActions";

interface InitialState {
  ok: boolean;
  message: string;
  loading: boolean;
  tweet: {
    id: string;
    userId: string;
    tweetType: TweetType;
    parentId?: string;
    content: string;
    createdAt: Date;
    updatedAt?: Date;

    likeCount?: number;
    replyCount?: number;
    retweetCount?: number;

    likes: Actions[];
    retweets: Actions[];
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
    createdAt: new Date(),
    updatedAt: undefined,

    likeCount: undefined,
    replyCount: undefined,
    retweetCount: undefined,

    likes: [],
    retweets: [],
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
      .addCase(getTweetDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.ok = action.payload.ok;
        state.message = action.payload.message;

        if (state.ok && action.payload.data) {
          state.tweet = action.payload.data;
        }
      })
      .addCase(getTweetDetails.rejected, (state, action) => {
        state.loading = false;
        state.ok = false;
        state.message = action.error.message || "Erro ao buscar dados do Tweet";
      });
  },
});

export const { resetTweetDetails, setTweetDetails } = tweetDetailsSlice.actions;
export const tweetDetailsReducer = tweetDetailsSlice.reducer;
