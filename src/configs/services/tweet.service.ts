/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Tweet,
  CreateTweetRequest,
  UpdateTweetRequest,
} from "../../types/tweet.type";
import { api, ResponseApi } from "./api.service";

export async function getAssessments(token: string) {
  try {
    // http://localhost:3000
    const response = await api.get<ResponseApi<Tweet[]>>("/tweets", {
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

export async function createAssessment(
  token: string,
  dataBody: CreateTweetRequest
) {
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

export async function updateAssessment(
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

export async function deleteAssessment(token: string, id: string) {
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
