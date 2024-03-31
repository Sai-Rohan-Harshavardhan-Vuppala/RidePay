import Wrapper from "./components/Wrapper";
import HomePage from "./components/HomePage";
import { Navigate } from "react-router-dom";
import ProfilePage from "./components/ProfilePage";

const routes = [
  {
    path: "/",
    element: <Wrapper />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/profile", element: <ProfilePage /> },
      { path: "*", element: <Navigate to="/" redirect /> },
    ],
  },
];

export default routes;
