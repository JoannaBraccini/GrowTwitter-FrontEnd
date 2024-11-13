import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Feed } from "../../pages/Feed";
import { Login } from "../../pages/Login";
import { Profile } from "../../pages/Profile";
import { Explore } from "../../pages/Explore";
import { Error } from "../../pages/Error";

const router = createBrowserRouter([
  { path: "/", element: <Login /> },
  { path: "/profile", element: <Profile /> },
  { path: "/explore", element: <Explore /> },
  { path: "/feed", element: <Feed /> },

  { path: "*", element: <Error />, errorElement: <Error /> },
]);

export function AppRoutes() {
  return <RouterProvider router={router} />;
}
