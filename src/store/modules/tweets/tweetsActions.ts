import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  CreateTweetRequest,
  TweetSearchRequest,
  UpdateTweetRequest,
} from "../../../types";
import { RootState } from "../..";
import {
  deleteTweetService,
  getTweetDetailsService,
  getTweetsService,
  postTweetService,
  updateTweetService,
} from "../../../configs/services/tweet.service";
import { showAlert } from "../alert/alertSlice";

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

    dispatch(
      showAlert({
        type: "success",
        message: response.message,
      })
    );

    return response;
  }
);
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

    // return algumaCoisa
    return response;
  }
);
