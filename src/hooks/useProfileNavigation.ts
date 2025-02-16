import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../store/hooks";
import { getUserDetails } from "../store/modules/users/usersActions";
import { showAlert } from "../store/modules/alert/alertSlice";
import { setUserDetails } from "../store/modules/users/userDetailsSlice";

export function useProfileNavigation() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleProfileClick = async (id: string) => {
    if (!id) return;

    try {
      const response = await dispatch(getUserDetails(id)).unwrap();
      if (response.data) {
        dispatch(setUserDetails(response.data));
        navigate(`/${response.data.username}`);
      } else {
        dispatch(
          showAlert({
            message: "Erro ao buscar dados do usuário",
            type: "error",
          })
        );
      }
    } catch {
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
