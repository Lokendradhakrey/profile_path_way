import React, { createContext, useEffect, useState } from "react";
import { loginApi, signupApi } from "../apis/AuthApi";
import Cookies from "js-cookie"; // Import js-cookie

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [profilename, setName] = useState(null);
  const [authenticated, setAuthenticated] = useState(false);
  const [userId, setUserId] = useState(null);

  const loginService = async (username, password) => {
    try {
      const response = await loginApi(username, password);
      if (response.status === 200) {
        setName(response.data.fullName);
        setAuthenticated(true);
        setUserId(response.data.userId);
        // Set the token in a cookie
        Cookies.set("token", "Bearer " + response.data.accessToken);
        // Set the fullName in a cookie
        Cookies.set("fullName", response.data.fullName);
        // set the userId in a cookie
        Cookies.set("userId", response.data.userId);
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
        setUserId(response.data.userId);
        // Set the token in a cookie
        Cookies.set("token", "Bearer " + response.data.accessToken);
        // Set the fullName in a cookie
        Cookies.set("fullName", response.data.fullName);
        // set the userId in a cookie
        Cookies.set("userId", response.data.userId);
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
    // Clear the cookies related to authentication
    Cookies.remove("token", { path: "/" });
    Cookies.remove("fullName", { path: "/" });
    Cookies.remove("userId", { path: "/" });

    // Update the authentication state
    setAuthenticated(false);
    setName(null);
    setUserId(null);

    // Optionally, redirect using React Router instead of reloading the page
    // navigate('/login'); // Use this if using React Router's useNavigate hook

    // Reload the page only if necessary, or navigate instead
    window.location.reload(); // Reloads without the `true` parameter to avoid full cache reload
  }

  const checkAuthentication = () => {
    const token = Cookies.get("token");
    if (token) {
      // Assume the user is authenticated if the token exists
      setAuthenticated(true);
      const storedfullName = Cookies.get("fullName");
      const storedUserId = Cookies.get("userId");
      if (storedfullName) {
        setName(storedfullName);
      }
      if (storedUserId) {
        setUserId(storedUserId);
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
      value={{
        loginService,
        signupService,
        logout,
        profilename,
        authenticated,
        userId,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
