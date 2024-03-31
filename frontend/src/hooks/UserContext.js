import React, { createContext, useContext, useState } from "react";
import { useGoogleLogin } from "@react-oauth/google";

import { USER_LOGIN_ROUTE, USER_LOGOUT_ROUTE, LOGIN_STATUS_ROUTE } from "../constants";

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
          updateUser(res.data.user);
        })
        .catch((err) => {
          console.log({ err });
          updateUser(null);
        });
    },
    onNonOAuthError: () => {
      updateLoading(false);
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

  const fetchUser = () => {
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

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        login,
        logout,
        updateUser,
        loading,
        updateLoading,
        fetchUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);
