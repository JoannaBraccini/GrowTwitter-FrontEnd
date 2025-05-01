import { getUserDetails } from "../store/modules/users/usersActions";
import { showAlert } from "../store/modules/alert/alertSlice";
import { validateToken } from "../store/modules/auth/validateTokenSlice";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { useNavigate } from "react-router-dom";

export function useProfileNavigation() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { token } = useAppSelector((state) => state.userLogged);

  const handleProfileClick = async (id: string) => {
    if (!id) return;

    try {
      // Valida o token antes de buscar os detalhes do usuário
      const isValid = await dispatch(validateToken(token)).unwrap();
      if (!isValid) {
        dispatch(
          showAlert({
            message: "Token inválido ou expirado. Faça login novamente.",
            type: "error",
          })
        );
        return;
      }

      const response = await dispatch(getUserDetails(id)).unwrap();
      if (response.data) {
        setTimeout(() => {
          navigate(`/${response.data?.username}`);
        }, 1000);
      } else {
        dispatch(
          showAlert({
            message: "Erro ao buscar dados do usuário",
            type: "error",
          })
        );
      }
    } catch (error) {
      console.log("Error:", error);

      dispatch(
        showAlert({
          message: "Falha ao carregar o perfil.",
          type: "error",
        })
      );
    }
  };

  return { handleProfileClick };
}
