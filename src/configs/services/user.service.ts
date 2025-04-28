/* eslint-disable @typescript-eslint/no-explicit-any */

import { Follow, User, UserSearchRequest, UserUpdate } from "../../@types";
import { ResponseApi, api } from "./api.service";

export async function followUserService(id: string, token: string) {
  try {
    const headers = { Authorization: `Bearer ${token}` };
    const response = await api.post<ResponseApi<Follow>>(
      `/users/follow/${id}`,
      { headers }
    );
    return {
      ok: response.data.ok,
      message: response.data.message,
      data: response.data.data,
    };
  } catch (error: any) {
    console.log("Error:", error.response.data);
    return {
      ok: error.response.data.ok,
      message: "Erro ao seguir usuário",
    };
  }
}

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
    console.log("Error:", error.response.data);
    return {
      ok: error.response.data.ok,
      message: "Erro ao buscar usuários",
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
    console.log("Error:", error.response.data);
    return {
      ok: error.response.data.ok,
      message: "Erro ao buscar detalhes do usuário",
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
    console.log("Error:", error.response.data);
    return {
      ok: error.response.data.ok,
      message: "Erro ao atualizar usuário",
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
    console.log("Error:", error.response.data);
    return {
      ok: error.response.data.ok,
      message: "Erro ao deletar conta",
    };
  }
}
