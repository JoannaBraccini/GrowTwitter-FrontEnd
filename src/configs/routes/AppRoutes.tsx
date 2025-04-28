import { RouterProvider, createBrowserRouter } from "react-router-dom";

import { Error } from "../../pages/Error";
import { Explore } from "../../pages/Explore";
import { Feed } from "../../pages/Feed";
import { Notifications } from "../../pages/Notifications";
import { Profile } from "../../pages/Profile";
import { Sign } from "../../pages/Sign";
import { TweetPage } from "../../pages/Tweet";

const router = createBrowserRouter([
  { path: "/", element: <Sign /> },
  { path: "/sign", element: <Sign /> },
  { path: "/feed", element: <Feed /> },
  { path: "/home", element: <Feed /> },
  { path: "/notifications", element: <Notifications /> },
  { path: "/tweet/:id", element: <TweetPage /> },
  {
    path: "/explore",
    element: <Explore />,
    children: [
      {
        path: ":topic",
        element: <Explore />,
      },
    ],
  },
  { path: "/profile/:username", element: <Profile /> },
  {
    path: "/:username",
    element: <Profile />,
  },
  { path: "*", element: <Error /> },
]);

export function AppRoutes() {
  return <RouterProvider router={router} />;
}
