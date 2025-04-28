import { Avatar } from "../components/Avatar";
import { DefaultLayout } from "../configs/layouts/DefaultLayout";
import { Notification } from "../@types";
import { NotificationsStyle } from "../components/NotificationsStyle";
import { useAppSelector } from "../store/hooks";

export function Notifications() {
  const notifications = useAppSelector((state) => state.notifications.list);
  const users = useAppSelector((state) => state.usersList.users);

  return (
    <DefaultLayout>
      <NotificationsStyle>
        <h1>Notificações</h1>
        {notifications.length > 0 ? (
          <ul>
            {notifications.map((notification: Notification, index: number) => {
              const user = users.find((u) => u.id === notification.userId);
              return (
                <li key={index}>
                  {user && <Avatar user={user} />}
                  <p>{notification.message}</p>
                  <small>{notification.timestamp}</small>
                </li>
              );
            })}
          </ul>
        ) : (
          <p>Você não possui notificações no momento.</p>
        )}
      </NotificationsStyle>
    </DefaultLayout>
  );
}
