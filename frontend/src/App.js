import "./App.css";
import { useRoutes } from "react-router-dom";

import router from "./routes";

function App() {
  const routing = useRoutes(router);

  return <div className="App">{routing}</div>;
}

export default App;
