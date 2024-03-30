import React, { createContext, useContext, useState } from "react";
import { useGoogleLogin } from "@react-oauth/google";

import { USER_LOGIN_ROUTE, USER_LOGOUT_ROUTE } from "../constants";

import axios from "axios";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const updateUser = (userData) => {
    setUser(userData);
    updateLoading(false);
  };
  const updateLoading = (loadingStatus) => setLoading(loadingStatus);

  const handleLogin = useGoogleLogin({
    onSuccess: async ({ code }) => {
      axios
        .post(USER_LOGIN_ROUTE, { code }, { withCredentials: true })
        .then((res) => {
          setUser(res.data.user);
        })
        .catch((err) => {
          console.log({ err });
        });
    },
    onError: () => {
      updateLoading(false);
    },
    flow: "auth-code",
  });

  const handleLogout = () => {
    axios
      .post(USER_LOGOUT_ROUTE, null, { withCredentials: true })
      .then((res) => {
        console.log(res);

        updateUser(null);
      })
      .catch((err) => {
        console.log({ err });

        alert("Failed to logout!");
        window.location.reload();
      });
  };

  const login = () => {
    updateLoading(true);
    handleLogin();
  };

  const logout = () => {
    updateLoading(true);
    handleLogout();
  };

  return (
    <UserContext.Provider
      value={{ user, setUser, login, logout, updateUser, loading, updateLoading }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);
