import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Feed } from "../../pages/Feed";
import { Sign } from "../../pages/Sign";
import { Profile } from "../../pages/Profile";
import { Explore } from "../../pages/Explore";
import { Error } from "../../pages/Error";

const router = createBrowserRouter([
  { path: "/", element: <Sign /> },
  { path: "/feed", element: <Feed /> },
  { path: "/profile", element: <Profile /> },
  { path: "/explore", element: <Explore /> },

  { path: "*", element: <Error />, errorElement: <Error /> },
]);

export function AppRoutes() {
  return <RouterProvider router={router} />;
}
