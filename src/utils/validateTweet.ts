import { AppDispatch } from "../store";
import { UserBase } from "../@types";
import { showAlert } from "../store/modules/alert/alertSlice";

export function validateTweet(
  dispatch: AppDispatch,
  userLogged: UserBase | null,
  content?: string,
  imageUrl?: string
): boolean {
  if (!userLogged) {
    dispatch(
      showAlert({
        message: "Faça login para acessar esta função",
        type: "warning",
      })
    );
    return false;
  }

  if ((!content || !content.trim()) && (!imageUrl || !imageUrl.trim())) {
    dispatch(
      showAlert({
        message: "Seu tweet não pode estar vazio.",
        type: "warning",
      })
    );
    return false;
  }

  return true;
}
