import { LoginResponse } from "../types";
import { getToken } from "./getToken";
import { getUser } from "./getUser";

export function getUserLogged(): LoginResponse | null {
  const user = getUser();
  const token = getToken();

  return user && token ? { user, token } : null;
}
