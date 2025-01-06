/* eslint-disable @typescript-eslint/no-explicit-any */

import { ProfileUpdate, User, UserSearchRequest } from "../../types";
import { api, ResponseApi } from "./api.service";

export async function getUsers(
  token: string,
  { name, username, email }: UserSearchRequest = {}
) {
  try {
    const response = await api.get<ResponseApi<User[]>>("/users", {
      headers: {
        Authorization: token,
      },
      params: {
        name,
        username,
        email,
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

export async function updateUser(
  token: string,
  { id, ...dataBody }: ProfileUpdate
) {
  try {
    const response = await api.put<ResponseApi<User>>(
      `/users/${id}`,
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
    const response = await api.delete<ResponseApi<User>>(`/users/${id}`, {
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
