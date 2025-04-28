import {
  CreateTweetRequest,
  RetweetRequest,
  TweetSearchRequest,
  UpdateTweetRequest,
} from "../../../@types";
import {
  deleteTweetService,
  getFeedService,
  getTweetDetailsService,
  getTweetsService,
  likeTweetService,
  postTweetService,
  retweetService,
  updateTweetService,
} from "../../../configs/services/tweet.service";

import { RootState } from "../..";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { showAlert } from "../alert/alertSlice";

// ######################################
// #               POST                 #
// ######################################

export const createTweet = createAsyncThunk(
  "tweets/create",
  async (data: CreateTweetRequest, { getState, dispatch }) => {
    const { userLogged } = getState() as RootState;
    const { token } = userLogged;
    const response = await postTweetService(token, data);
    if (!response.ok) {
      dispatch(
        showAlert({
          message: response.message,
          type: "error",
        })
      );

      return response;
    }

    dispatch(
      showAlert({
        message: response.message,
        type: "success",
      })
    );
    return response;
  }
);

export const likeTweet = createAsyncThunk(
  "tweets/like",
  async (id: string, { dispatch, getState }) => {
    const { userLogged } = getState() as RootState;
    const { token } = userLogged;

    const response = await likeTweetService(id, token);

    if (!response.ok) {
      dispatch(
        showAlert({
          message: response.message,
          type: "error",
        })
      );
    }

    return response;
  }
);

export const retweetTweet = createAsyncThunk(
  "tweets/retweet",
  async ({ tweetId, comment }: RetweetRequest, { dispatch, getState }) => {
    const { userLogged } = getState() as RootState;
    console.log("Estado do usuário no Redux:", userLogged); // Adicione este log
    const { token } = userLogged;

    if (!tweetId) {
      dispatch(
        showAlert({
          message: "Tweet ID is required",
          type: "error",
        })
      );
      throw new Error("Tweet ID is required");
    }

    const response = await retweetService({ tweetId, comment }, token);

    if (!response.ok) {
      dispatch(
        showAlert({
          message: response.message,
          type: "error",
        })
      );
    }

    return response;
  }
);

// ######################################
// #                GET                 #
// ######################################

export const getTweets = createAsyncThunk(
  "tweets/findAll",
  async (query: TweetSearchRequest, { dispatch, getState }) => {
    const { userLogged } = getState() as RootState;
    const { token } = userLogged;

    const response = await getTweetsService(query, token);

    if (!response.ok) {
      dispatch(
        showAlert({
          message: response.message,
          type: "error",
        })
      );
    }

    return response;
  }
);

export const getFeed = createAsyncThunk(
  "tweets/feed",
  async (query: TweetSearchRequest, { dispatch, getState }) => {
    const { userLogged } = getState() as RootState;
    const { token } = userLogged;

    const response = await getFeedService(query, token);

    if (!response.ok) {
      dispatch(
        showAlert({
          message: response.message,
          type: "error",
        })
      );
    }

    return response;
  }
);

export const getTweetDetails = createAsyncThunk(
  "tweets/findOne",
  async (id: string, { dispatch, getState }) => {
    const { userLogged } = getState() as RootState;
    const { token } = userLogged;

    const response = await getTweetDetailsService({ id, token });

    if (!response.ok) {
      dispatch(
        showAlert({
          type: "error",
          message: response.message,
        })
      );
      return response;
    }
    return response;
  }
);

// ######################################
// #                PUT                 #
// ######################################

export const updateTweet = createAsyncThunk(
  "tweets/update",
  async ({ id, ...data }: UpdateTweetRequest, { dispatch, getState }) => {
    const { userLogged } = getState() as RootState;
    const { token } = userLogged;

    const response = await updateTweetService(token, { id, ...data });

    if (!response.ok) {
      dispatch(
        showAlert({
          type: "error",
          message: response.message,
        })
      );
      return response;
    }

    dispatch(
      showAlert({
        type: "success",
        message: response.message,
      })
    );

    return response;
  }
);

// ######################################
// #               DELETE               #
// ######################################

export const deleteTweet = createAsyncThunk(
  "tweets/delete",
  async (id: string, { dispatch, getState }) => {
    const { userLogged } = getState() as RootState;
    const { token } = userLogged;

    const response = await deleteTweetService(token, id);

    if (!response.ok) {
      dispatch(
        showAlert({
          type: "error",
          message: response.message,
        })
      );

      return response;
    }

    dispatch(
      showAlert({
        type: "success",
        message: response.message,
      })
    );

    return response;
  }
);
