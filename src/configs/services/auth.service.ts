/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  LoginRequest,
  LoginResponse,
  SignupRequest,
  SignupResponse,
} from "../../@types/auth.type";
import { api, ResponseApi } from "./api.service";

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
    return {
      ok: error.response.data.ok,
      message: error.response.data.message,
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
    // }
  } catch (error: any) {
    return {
      ok: error.response.data.ok,
      message: error.response.data.message,
    };
  }
}
