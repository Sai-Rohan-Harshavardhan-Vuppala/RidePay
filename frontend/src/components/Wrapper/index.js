import { Outlet } from "react-router-dom";
import { useUserContext } from "../../hooks/UserContext";
import LoadingPage from "../LoadingPage";
import axios from "axios";
import { useEffect } from "react";

import { LOGIN_STATUS_ROUTE } from "../../constants";
import LoginPage from "../LoginPage";

const Wrapper = () => {
  const { user, loading, updateUser } = useUserContext();

  const getLoginStatus = () => {
    axios
      .get(LOGIN_STATUS_ROUTE, { withCredentials: true })
      .then((res) => {
        console.log({ res });
        updateUser(res.data);
      })
      .catch((err) => {
        console.log({ err });

        updateUser(null);
      });
  };

  useEffect(() => {
    getLoginStatus();
  }, []);

  if (loading)
    return (
      <div
        style={{
          display: "flex",
          width: "100vw",
          height: "100vh",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <LoadingPage width="100px" height="100px" />
      </div>
    );

  if (!user) return <LoginPage />;

  return (
    <div>
      <nav>NAVBAR</nav>
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default Wrapper;
