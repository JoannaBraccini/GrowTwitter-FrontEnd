import {
  LoginRequest,
  LoginResponse,
  SignupRequest,
} from "../../types/auth.type";
import { api, ResponseApi } from "./api.service";

export async function signUp(user: SignupRequest) {
  try {
    const response = await api.post<ResponseApi<{ token: string }>>(
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

export async function login(user: LoginRequest) {
  try {
    const response = await api.post<ResponseApi<LoginResponse>>("/login", user);

    if (response.data.ok) {
      if (response.data.data) {
        const userData = {
          token: response.data.data.token,
          userId: response.data.data.userId,
          username: response.data.data.username,
          name: response.data.data.name,
        };
        localStorage.setItem("user", JSON.stringify(userData));
      }

      return {
        ok: response.data.ok,
        message: response.data.message,
        data: response.data.data,
      };
    }
  } catch (error: any) {
    return {
      ok: error.response.data.ok,
      message: error.response.data.message,
    };
  }
}
