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
import { validateToken } from "../auth/validateTokenSlice";

// Função utilitária para validar o token
// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function validateTokenOrThrow(dispatch: any, token: string) {
  const isValid = await dispatch(validateToken(token)).unwrap();
  if (!isValid) {
    throw new Error("Token inválido ou expirado");
  }
}

// ######################################
// #               POST                 #
// ######################################

export const createTweet = createAsyncThunk(
  "tweets/create",
  async (data: CreateTweetRequest, { getState, dispatch }) => {
    const { userLogged } = getState() as RootState;
    const { token } = userLogged;

    await validateTokenOrThrow(dispatch, token);

    return await postTweetService(token, data);
  }
);

export const likeTweet = createAsyncThunk(
  "tweets/like",
  async (id: string, { dispatch, getState }) => {
    const { userLogged } = getState() as RootState;
    const { token } = userLogged;

    await validateTokenOrThrow(dispatch, token);

    const response = await likeTweetService(id, token);

    if (!response.ok) {
      console.log(response.message);
      dispatch(
        showAlert({
          message: "Erro ao curtir tweet",
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
    const { token } = userLogged;

    await validateTokenOrThrow(dispatch, token);

    if (!tweetId) {
      dispatch(
        showAlert({
          message: "Tweet ID é obrigatório",
          type: "error",
        })
      );
      throw new Error("Tweet ID is required");
    }

    const response = await retweetService({ tweetId, comment }, token);

    if (!response.ok) {
      console.log(response.message);

      dispatch(
        showAlert({
          message: "Erro ao retweetar",
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

    await validateTokenOrThrow(dispatch, token);

    const response = await getTweetsService(query, token);

    if (!response.ok) {
      console.log(response.message);
      dispatch(
        showAlert({
          message: "Erro ao buscar tweets",
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

    await validateTokenOrThrow(dispatch, token);

    const response = await getFeedService(query, token);

    if (!response.ok) {
      console.log(response.message);
      dispatch(
        showAlert({
          message: "Erro ao buscar feed",
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

    await validateTokenOrThrow(dispatch, token);

    const response = await getTweetDetailsService({ id, token });

    if (!response.ok) {
      console.log(response.message);
      dispatch(
        showAlert({
          type: "error",
          message: "Erro ao buscar detalhes do tweet",
        })
      );
      return response;
    }
    return response;
  }
);

// Novo thunk para buscar tweets e feed juntos
export const fetchTweetsAndFeed = createAsyncThunk(
  "tweets/fetchTweetsAndFeed",
  async (_, { dispatch }) => {
    await Promise.all([
      dispatch(getFeed({ page: 1, take: 20 })),
      dispatch(getTweets({ page: 1, take: 20 })),
    ]);
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

    await validateTokenOrThrow(dispatch, token);

    const response = await updateTweetService(token, { id, ...data });

    if (!response.ok) {
      console.log(response.message);
      dispatch(
        showAlert({
          type: "error",
          message: "Erro ao atualizar tweet",
        })
      );
      return response;
    }
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

    await validateTokenOrThrow(dispatch, token);

    const response = await deleteTweetService(token, id);

    if (!response.ok) {
      console.log(response.message);
      dispatch(
        showAlert({
          type: "error",
          message: "Erro ao deletar tweet",
        })
      );

      return response;
    }
  }
);
