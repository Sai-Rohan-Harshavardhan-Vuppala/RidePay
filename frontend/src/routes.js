import Wrapper from "./components/Wrapper";
import HomePage from "./components/HomePage";
import { Navigate } from "react-router-dom";
import AddVehiclePage from "./components/AddVehiclePage";
import StopsPage from "./components/StopsPage";
const routes = [
  {
    path: "/",
    element: <Wrapper />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/addVehicle", element: <AddVehiclePage /> },
      { path: "/stops", element: <StopsPage /> },
      { path: "*", element: <Navigate to="/" redirect /> },
    ],
  },
];

export default routes;
