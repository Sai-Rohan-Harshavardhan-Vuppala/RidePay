import Wrapper from "./components/Wrapper";
import HomePage from "./components/HomePage";
import { Navigate } from "react-router-dom";

const routes = [
  {
    path: "/",
    element: <Wrapper />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "*", element: <Navigate to="/" redirect /> },
    ],
  },
];

export default routes;
