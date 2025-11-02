/* eslint-disable @typescript-eslint/no-explicit-any */

import {
  LoginRequest,
  LoginResponse,
  SignupRequest,
  SignupResponse,
} from "../../@types/auth.type";
import { ResponseApi, api } from "./api.service";

export async function signupService(user: SignupRequest) {
  try {
    const response = await api.post<ResponseApi<SignupResponse>>(
      "/signup",
      user
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
      message: "Erro ao criar conta",
    };
  }
}

export async function loginService(user: Omit<LoginRequest, "remember">) {
  try {
    const response = await api.post<ResponseApi<LoginResponse>>("/login", user);

    return {
      ok: response.data.ok,
      message: response.data.message,
      data: response.data.data,
    };
  } catch (error: any) {
    return {
      ok: false,
      message: error.response?.data?.message || "Erro ao fazer login",
    };
  }
}
