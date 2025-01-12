import { LoginResponse } from "../types";

export function getUserLogged(): LoginResponse | null {
  try {
    const sessionUser = sessionStorage.getItem("user");
    const localUser = localStorage.getItem("user");
    const sessionToken = sessionStorage.getItem("token");
    const localToken = localStorage.getItem("token");

    const user = sessionUser
      ? JSON.parse(sessionUser)
      : localUser
      ? JSON.parse(localUser)
      : null;

    const token = sessionToken ? sessionToken : localToken ? localToken : null;

    if (user && token) {
      return {
        ...user,
        token: token,
      };
    }
    return null;
  } catch (error) {
    console.error("Erro ao buscar usuário no storage:", error);
    return null;
  }
}
