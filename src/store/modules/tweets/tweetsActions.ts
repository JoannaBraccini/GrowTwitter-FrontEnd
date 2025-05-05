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
import { handle403 } from "../utils/errorHandlers";
import { showAlert } from "../alert/alertSlice";
import { validateTokenOrThrow } from "../utils/authUtils";

// ######################################
// #               POST                 #
// ######################################

export const createTweet = createAsyncThunk(
  "tweets/create",
  async (data: CreateTweetRequest, { getState, dispatch }) => {
    const { userLogged } = getState() as RootState;
    const { token } = userLogged;

    await validateTokenOrThrow(dispatch, token);

    const response = await postTweetService(token, data);
    const handled = await handle403(response, dispatch);

    if (!response.ok && !handled) {
      console.log(response.message);
      dispatch(
        showAlert({
          message: "Erro ao criar tweet",
          type: "error",
        })
      );
    }

    return response;
  }
);

export const likeTweet = createAsyncThunk(
  "tweets/like",
  async (id: string, { dispatch, getState }) => {
    const { userLogged } = getState() as RootState;
    const { token } = userLogged;

    await validateTokenOrThrow(dispatch, token);

    const response = await likeTweetService(id, token);
    const handled = await handle403(response, dispatch);

    if (!response.ok && !handled) {
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
  async (data: RetweetRequest, { dispatch, getState }) => {
    const { tweetId, comment } = data;
    console.log("tweetId", tweetId);

    const { userLogged } = getState() as RootState;
    const { token } = userLogged;

    await validateTokenOrThrow(dispatch, token);

    const response = await retweetService({ tweetId, comment }, token);
    console.log("response", response);

    const handled = await handle403(response, dispatch); // Reutiliza a função exportada

    if (!response.ok && !handled) {
      console.error(response.message);
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

    const handled = await handle403(response, dispatch); // Verifica se o erro foi tratado

    if (!response.ok && !handled) {
      // Continua no if mesmo que o handle403 tenha sido chamado
      console.log(response.message);
      dispatch(
        showAlert({
          type: "error",
          message: "Erro ao atualizar tweet",
        })
      );
    }

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

    await validateTokenOrThrow(dispatch, token);

    const response = await deleteTweetService(token, id);

    const handled = await handle403(response, dispatch);

    if (!response.ok && !handled) {
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
