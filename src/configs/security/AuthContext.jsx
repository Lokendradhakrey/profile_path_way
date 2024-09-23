import React, { createContext, useEffect, useState } from "react";
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
        setName(response.data.fullName);
        setAuthenticated(true);
        // Set the token in a cookie
        Cookies.set("token", "Bearer " + response.data.accessToken);
        // Set the fullName in a cookie
        Cookies.set("fullName", response.data.fullName);
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

  const signupService = async (fullName, username, email, password) => {
    try {
      const response = await signupApi(fullName, username, email, password);
      if (response.status === 200) {
        setName(response.data.fullName);
        setAuthenticated(true);
        // Set the token in a cookie
        Cookies.set("token", "Bearer " + response.data.accessToken);
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
    Cookies.remove("fullName");
    setAuthenticated(false);
    setName(null);
    window.location.reload(true);
  };

  const checkAuthentication = () => {
    const token = Cookies.get("token");
    if (token) {
      // Assume the user is authenticated if the token exists
      setAuthenticated(true);
      const storedfullName = Cookies.get("fullName");
    if (storedfullName) {
      setName(storedfullName);
    }
    } else {
      setAuthenticated(false);
    }
  };

  useEffect(() => {
    checkAuthentication();
  }, []);

  return (
    <AuthContext.Provider
      value={{ loginService, authenticated, signupService, logout, profilename }}
    >
      {children}
    </AuthContext.Provider>
  );
}
