/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Tweet,
  CreateTweetRequest,
  UpdateTweetRequest,
  TweetSearchRequest,
} from "../../types/tweet.type";
import { api, ResponseApi } from "./api.service";

export async function getTweets(
  token: string,
  { page, take, search }: TweetSearchRequest = {}
) {
  try {
    const response = await api.get<ResponseApi<Tweet[]>>("/tweets", {
      headers: {
        Authorization: token,
      },
      params: {
        page,
        take,
        search,
      },
    });

    return {
      ok: response.data.ok,
      message: response.data.message,
      data: response.data.data,
    };
  } catch (error: any) {
    return {
      ok: error.response.data.ok,
      message: `Erro: ${error.response.data.message}`,
    };
  }
}

export async function createTweet(token: string, dataBody: CreateTweetRequest) {
  try {
    const response = await api.post<ResponseApi<Tweet>>("/tweets", dataBody, {
      headers: {
        Authorization: token,
      },
    });

    return {
      ok: response.data.ok,
      message: response.data.message,
      data: response.data.data,
    };
  } catch (error: any) {
    return {
      ok: error.response.data.ok,
      message: `Erro: ${error.response.data.message}`,
    };
  }
}

export async function updateTweet(
  token: string,
  { id, ...dataBody }: UpdateTweetRequest
) {
  try {
    const response = await api.put<ResponseApi<Tweet>>(
      `/tweets/${id}`,
      dataBody,
      {
        headers: {
          Authorization: token,
        },
      }
    );

    return {
      ok: response.data.ok,
      message: response.data.message,
      data: response.data.data,
    };
  } catch (error: any) {
    return {
      ok: error.response.data.ok,
      message: `Erro: ${error.response.data.message}`,
    };
  }
}

export async function deleteTweet(token: string, id: string) {
  try {
    const response = await api.delete<ResponseApi<Tweet>>(`/tweets/${id}`, {
      headers: { Authorization: token },
    });

    return {
      ok: response.data.ok,
      message: response.data.message,
      data: response.data.data,
    };
  } catch (error: any) {
    return {
      ok: error.response.data.ok,
      message: `Erro: ${error.response.data.message}`,
    };
  }
}
