import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Feed } from "../../pages/Feed";
import { Sign } from "../../pages/Sign";
import { Profile } from "../../pages/Profile";
import { Explore } from "../../pages/Explore";
import { Error } from "../../pages/Error";
import { TabReplies } from "../../components/Tabs/TabReplies";
import { TabLikes } from "../../components/Tabs/TabLikes";

const router = createBrowserRouter([
  { path: "/", element: <Sign /> },
  { path: "/feed", element: <Feed /> },
  { path: "/:username", element: <Profile /> },
  {
    path: "/:username",
    element: <Profile />, // Mantém o profile como componente pai
    children: [
      { path: "replies", element: <TabReplies /> }, // Componente para as respostas
      { path: "likes", element: <TabLikes /> }, // Componente para os tweets curtidos
    ],
  },
  { path: "/explore", element: <Explore /> },

  { path: "*", element: <Error />, errorElement: <Error /> },
]);

export function AppRoutes() {
  return <RouterProvider router={router} />;
}
