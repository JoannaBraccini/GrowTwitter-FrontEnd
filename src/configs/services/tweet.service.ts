/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Tweet,
  CreateTweetRequest,
  UpdateTweetRequest,
  TweetSearchRequest,
} from "../../types/tweet.type";
import { api, ResponseApi } from "./api.service";

export async function getTweets(
  { page, take, search }: TweetSearchRequest = {},
  token?: string
) {
  try {
    const headers = token ? { Authorization: `Bearer ${token}` } : undefined;
    const response = await api.get<ResponseApi<Tweet[]>>("/tweets", {
      headers,
      params: {
        page,
        take,
        search,
      },
    });
    const tweetsData = response.data.data;
    if (!tweetsData) {
      return {
        ok: response.data.ok,
        message: response.data.message,
        data: [],
      };
    }
    // Adiciona username e name dos usuários diretamente na resposta
    return {
      ok: response.data.ok,
      message: response.data.message,
      data: tweetsData,
    };
  } catch (error: any) {
    return {
      ok: error.response.data.ok,
      message: `Erro: ${error.response.data.message}`,
    };
  }
}

export async function postTweet(token: string, dataBody: CreateTweetRequest) {
  try {
    const response = await api.post<ResponseApi<Tweet>>("/tweets", dataBody, {
      headers: {
        Authorization: `Bearer ${token}`,
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
