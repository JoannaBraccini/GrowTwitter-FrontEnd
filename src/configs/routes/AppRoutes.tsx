import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Feed } from "../../pages/Feed";
import { Sign } from "../../pages/Sign";
import { Profile } from "../../pages/Profile";
import { Explore } from "../../pages/Explore";
import { Error } from "../../pages/Error";
import { TabReplies } from "../../components/Tabs/TabReplies";
import { TabLikes } from "../../components/Tabs/TabLikes";
import { TabMedia } from "../../components/Tabs/TabMedia";
import { Notifications } from "../../pages/Notifications";

const router = createBrowserRouter([
  { path: "/", element: <Sign /> },
  { path: "/sign", element: <Sign /> },
  { path: "/feed", element: <Feed /> },
  { path: "/home", element: <Feed /> },
  { path: "/explore", element: <Explore /> },
  { path: "/notifications", element: <Notifications /> },
  { path: "/profile/:username", element: <Profile /> },
  {
    path: "/:username",
    element: <Profile />, // Mantém o profile como componente pai
    children: [
      { path: "replies", element: <TabReplies /> }, // Componente para as respostas
      { path: "likes", element: <TabLikes /> }, // Componente para os tweets curtidos
      { path: "media", element: <TabMedia /> }, // Componente para imagens postadas
    ],
  },
  { path: "*", element: <Error /> },
]);

export function AppRoutes() {
  return <RouterProvider router={router} />;
}
