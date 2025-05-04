/* eslint-disable @typescript-eslint/no-explicit-any */

import {
  CreateTweetRequest,
  Like,
  Retweet,
  RetweetRequest,
  Tweet,
  TweetSearchRequest,
  UpdateTweetRequest,
} from "../../@types/tweet.type";
import { ResponseApi, api } from "./api.service";

export async function postTweetService(
  token: string,
  dataBody: CreateTweetRequest
) {
  try {
    const response = await api.post<ResponseApi<Tweet>>("/tweets", dataBody, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return {
      ok: response.data.ok,
      message: response.data.message,
      data: response.data.data,
    };
  } catch (error: any) {
    console.log("Error:", error.response?.data);

    return {
      ok: false,
      message: error.response?.data?.message || "Erro ao criar tweet",
    };
  }
}

export async function likeTweetService(id: string, token: string) {
  try {
    const headers = { Authorization: `Bearer ${token}` };
    const response = await api.patch<ResponseApi<Like>>(
      `/tweets/like/${id}`,
      {},
      { headers }
    );

    return {
      ok: response.data.ok,
      message: response.data.message,
      data: response.data.data,
    };
  } catch (error: any) {
    console.log("Error:", error.response?.data);

    return {
      ok: false,
      message:
        error.response?.data?.message || "Erro ao curtir/descurtir tweet",
    };
  }
}

export async function retweetService(
  { tweetId, comment }: RetweetRequest,
  token: string
) {
  try {
    const headers = { Authorization: `Bearer ${token}` };
    const response = await api.patch<ResponseApi<Retweet>>(
      `/tweets/retweet/${tweetId}`,
      { comment },
      { headers }
    );

    return {
      ok: response.data.ok,
      message: response.data.message,
      data: response.data.data,
    };
  } catch (error: any) {
    console.log("Error:", error.response?.data);

    return {
      ok: false,
      message: error.response?.data?.message || "Erro ao retweetar",
    };
  }
}

export async function getTweetsService(
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
      console.log("Sem dados de tweets na resposta:", response.data);
      return {
        ok: response.data.ok,
        message: "Nenhum tweet encontrado",
        data: [],
      };
    }
    return {
      ok: response.data.ok,
      message: response.data.message,
      data: tweetsData,
    };
  } catch (error: any) {
    console.log("Error:", error.response?.data);
    return {
      ok: false,
      message: error.response?.data?.message || "Erro ao buscar dados do tweet",
    };
  }
}

export async function getFeedService(
  { page, take, search }: TweetSearchRequest = {},
  token: string
) {
  try {
    const response = await api.get<ResponseApi<Tweet[]>>("/tweets/feed", {
      headers: { Authorization: `Bearer ${token}` },
      params: {
        page,
        take,
        search,
      },
    });
    const tweetsData = response.data.data;
    if (!tweetsData) {
      console.log("Sem dados de tweets na resposta do feed:", response.data);

      return {
        ok: response.data.ok,
        message: "Sem dados de tweets na resposta do feed",
        data: [],
      };
    }
    return {
      ok: response.data.ok,
      message: response.data.message,
      data: tweetsData,
    };
  } catch (error: any) {
    console.log("Error:", error.response?.data);

    return {
      ok: false,
      message: error.response?.data?.message || "Erro ao buscar dados do feed",
    };
  }
}

export async function getTweetDetailsService(data: {
  id: string;
  token: string;
}): Promise<ResponseApi<Tweet>> {
  const { id, token } = data;

  try {
    const response = await api.get(`/tweets/${id}`, {
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
    console.log("Error:", error.response?.data);

    return {
      ok: false,
      message: error.response?.data?.message || "Erro ao buscar dados do tweet",
    };
  }
}

export async function updateTweetService(
  token: string,
  { id, ...dataBody }: UpdateTweetRequest
): Promise<ResponseApi<Tweet>> {
  try {
    const response = await api.put<ResponseApi<Tweet>>(
      `/tweets/${id}`,
      dataBody,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return {
      ok: response.data.ok,
      message: response.data.message,
      data: response.data.data,
    };
  } catch (error: any) {
    console.log("Error:", error.response?.data);

    return {
      ok: false,
      message: error.response?.data?.message || "Erro ao atualizar tweet",
    };
  }
}

export async function deleteTweetService(token: string, id: string) {
  try {
    const response = await api.delete<ResponseApi<Tweet>>(`/tweets/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return {
      ok: response.data.ok,
      message: response.data.message,
      data: response.data.data,
    };
  } catch (error: any) {
    console.log("Error:", error.response?.data);

    return {
      ok: false,
      message: error.response?.data?.message || "Erro ao deletar tweet",
    };
  }
}
