import Wrapper from "./components/Wrapper";
import HomePage from "./components/HomePage";
import { Navigate } from "react-router-dom";
import VehiclesPage from "./components/VehiclesPage";
import StopsPage from "./components/StopsPage";
import ProfilePage from "./components/ProfilePage";
import RoutesPage from "./components/RoutesPage";
import SchedulePage from "./components/SchedulePage";
import WalletPage from "./components/WalletPage";
import TransactionPage from "./components/TransactionPage";
import Page404 from "./components/404Page";

const routes = (role) => {
  if (role !== "admin")
    return [
      {
        path: "/",
        element: <Wrapper />,
        children: [
          { path: "/", element: <HomePage /> },
          { path: "/profile", element: <ProfilePage /> },
          { path: "/schedule", element: <SchedulePage /> },
          { path: "/wallet", element: <WalletPage /> },
          { path: "/transaction/:id", element: <TransactionPage /> },
          { path: "/404", element: <Page404 /> },
          { path: "*", element: <Navigate to="/" redirect /> },
        ],
      },
    ];

  return [
    {
      path: "/",
      element: <Wrapper />,
      children: [
        { path: "/", element: <HomePage /> },
        { path: "/vehicles", element: <VehiclesPage /> },
        { path: "/stops", element: <StopsPage /> },
        { path: "/profile", element: <ProfilePage /> },
        { path: "/routes", element: <RoutesPage /> },
        { path: "/schedule", element: <SchedulePage /> },
        { path: "/faculty-stats", element: <SchedulePage /> },
        { path: "/404", element: <Page404 /> },
        { path: "*", element: <Navigate to="/" redirect /> },
      ],
    },
  ];
};

export default routes;
