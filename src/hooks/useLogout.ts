import { useCallback } from "react";
import { useAppDispatch } from "../store/hooks";
import { useNavigate } from "react-router-dom";
import { logout } from "../store/modules/auth/loginSlice";

export function useLogout() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = useCallback(() => {
    dispatch(logout());
    navigate("/sign");
  }, [dispatch, navigate]);

  return { handleLogout };
}
