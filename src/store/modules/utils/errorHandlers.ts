import { showAlert } from "../alert/alertSlice";

export async function handle403(
  response: { ok: boolean; message: string },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dispatch: any
): Promise<boolean> {
  if (
    !response.ok &&
    response.message ===
      "Ações sensíveis estão desabilitadas no ambiente de teste."
  ) {
    dispatch(
      showAlert({
        message: response.message,
        type: "info",
      })
    );
    return true; // Indica que o erro foi tratado
  }
  return false; // Indica que o erro não foi tratado
}
