/* eslint-disable @typescript-eslint/no-explicit-any */

import { UserUpdate, User, UserSearchRequest } from "../../types";
import { api, ResponseApi } from "./api.service";

export async function getUsersService(
  { name, username, email }: UserSearchRequest = {},
  token?: string
) {
  try {
    //Define o headers para busca pública ou autenticada
    const headers = token ? { Authorization: `Bearer ${token}` } : undefined;
    const response = await api.get<ResponseApi<User[]>>("/users", {
      headers,
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

export async function getUserDetailsService(id: string, token: string) {
  try {
    const headers = token ? { Authorization: `Bearer ${token}` } : undefined;
    const response = await api.get<ResponseApi<User>>(`/users/${id}`, {
      headers,
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

export async function updateUserService(
  token: string,
  { id, ...data }: UserUpdate
) {
  try {
    const response = await api.put<ResponseApi<User>>(`/users/${id}`, data, {
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

export async function deleteUserService(token: string, id: string) {
  try {
    const response = await api.delete<ResponseApi<User>>(`/users/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
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
