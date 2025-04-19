import { LoginResponse } from "../@types";

export function getUser(): LoginResponse | null {
  const sessionUser = sessionStorage.getItem("user");
  const localUser = localStorage.getItem("user");
  return sessionUser
    ? JSON.parse(sessionUser)
    : localUser
    ? JSON.parse(localUser)
    : null;
}
