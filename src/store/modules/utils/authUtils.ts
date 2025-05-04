import { validateToken } from "../auth/validateTokenSlice";

// Função utilitária para validar o token
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function validateTokenOrThrow(dispatch: any, token: string) {
  const isValid = await dispatch(validateToken(token)).unwrap();
  if (!isValid) {
    throw new Error("Token inválido ou expirado");
  }
}
