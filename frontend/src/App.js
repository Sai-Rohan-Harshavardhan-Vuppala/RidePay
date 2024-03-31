import "./App.css";
import { useRoutes } from "react-router-dom";

import router from "./routes";
import { useUserContext } from "./hooks/UserContext";

function App() {
  const { user } = useUserContext();
  const routing = useRoutes(router(user?.role));

  return <div className="App">{routing}</div>;
}

export default App;
