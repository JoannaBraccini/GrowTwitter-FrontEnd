import { LoginResponse } from "../types";

export function getUser(): LoginResponse["user"] | null {
  try {
    const sessionUser = sessionStorage.getItem("user");
    const localUser = localStorage.getItem("user");

    const user = sessionUser
      ? JSON.parse(sessionUser)
      : localUser
      ? JSON.parse(localUser)
      : null;

    return user;
  } catch (error) {
    console.error("Erro ao buscar usuário no storage:", error);
    return null;
  }
}
