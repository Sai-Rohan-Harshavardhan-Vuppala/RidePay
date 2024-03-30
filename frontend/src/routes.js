import Wrapper from "./components/Wrapper";
import HomePage from "./components/HomePage";

const routes = [
  { path: "/", element: <Wrapper />, children: [{ path: "/", element: <HomePage /> }] },
];

export default routes;
