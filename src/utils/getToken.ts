export function getToken() {
  const sessionUser = sessionStorage.getItem("user");
  const localUser = localStorage.getItem("user");

  const sessionToken = sessionUser ? JSON.parse(sessionUser).token : null;
  const localToken = localUser ? JSON.parse(localUser).token : null;

  return sessionToken ? sessionToken : localToken;
}
