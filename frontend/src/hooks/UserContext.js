import React, { createContext, useContext, useState } from "react";
import { useGoogleLogin } from "@react-oauth/google";

import { USER_LOGIN_ROUTE, USER_LOGOUT_ROUTE } from "../constants";

import axios from "axios";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const updateUser = (userData) => setUser(userData);

  const login = useGoogleLogin({
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
    flow: "auth-code",
  });

  const logout = () => {
    axios
      .post(USER_LOGOUT_ROUTE, null, { withCredentials: true })
      .then((res) => {
        console.log(res);

        setUser(null);
      })
      .catch((err) => {
        console.log({ err });

        alert("Failed to logout!");
        window.location.reload();
      });
  };

  return (
    <UserContext.Provider value={{ user, setUser, login, logout, updateUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);
