import Wrapper from "./components/Wrapper";
import LoginPage from "./components/LoginPage";

const routes = [
  { path: "/", element: <Wrapper />, children: [{ path: "/", element: <LoginPage /> }] },
];

export default routes;
