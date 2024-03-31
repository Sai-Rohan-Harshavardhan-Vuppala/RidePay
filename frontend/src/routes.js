import Wrapper from "./components/Wrapper";
import HomePage from "./components/HomePage";
import { Navigate } from "react-router-dom";
import AddVehiclePage from "./components/AddVehiclePage";
import StopsPage from "./components/StopsPage";
import ProfilePage from "./components/ProfilePage";
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
        { path: "/addVehicle", element: <AddVehiclePage /> },
        { path: "/stops", element: <StopsPage /> },
        { path: "/profile", element: <ProfilePage /> },
        { path: "/schedule", element: <SchedulePage /> },
        { path: "/stops", element: <SchedulePage /> },
        { path: "/routes", element: <SchedulePage /> },
        { path: "/faculty-stats", element: <SchedulePage /> },
        { path: "/404", element: <Page404 /> },
        { path: "*", element: <Navigate to="/" redirect /> },
      ],
    },
  ];
};

export default routes;
