import { Notification } from "../@types";
import { addNotification } from "../store/modules/notifications/notificationsSlice";
import { useAppDispatch } from "../store/hooks";

export function useNotifications() {
  const dispatch = useAppDispatch();

  const createNotification = (
    notification: Omit<Notification, "id" | "timestamp">
  ) => {
    const newNotification: Notification = {
      id: Math.random().toString(36).substr(2, 9), // Gera um ID único
      timestamp: new Date().toISOString(),
      ...notification,
    };
    dispatch(addNotification(newNotification));
  };

  return { createNotification };
}
