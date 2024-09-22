import React, { createContext, useState } from "react";
import { loginApi, signupApi } from "../apis/AuthApi";
import Cookies from "js-cookie"; // Import js-cookie

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [profilename, setName] = useState(null);
  const [authenticated, setAuthenticated] = useState(false);

  const loginService = async (username, password) => {
    try {
      const response = await loginApi(username, password);
      if (response.status === 200) {
        setName(response.data.username);
        setAuthenticated(true);
        // Set the token in a cookie
        Cookies.set("token", "Bearer " + response.data.accessToken, { expires: 1 });
        return true;
      } else {
        setAuthenticated(false);
        return false;
      }
    } catch (error) {
      console.log(error);
      setAuthenticated(false);
      return false;
    }
  };

  const signupService = async (fullname, username, email, password) => {
    try {
      const response = await signupApi(fullname, username, email, password);
      if (response.status === 200) {
        setName(response.data.username);
        setAuthenticated(true);
        // Set the token in a cookie
        Cookies.set("token", "Bearer " + response.data.accessToken, { expires: 1 });
        return true;
      } else {
        setAuthenticated(false);
        return false;
      }
    } catch (error) {
      console.log(error);
      setAuthenticated(false);
      return false;
    }
  };

  function logout() {
    // Clear the token from the cookies on logout
    Cookies.remove("token");
    setAuthenticated(false);
    setName(null);
  };

  return (
    <AuthContext.Provider
      value={{ loginService, authenticated, signupService, logout, profilename }}
    >
      {children}
    </AuthContext.Provider>
  );
}
