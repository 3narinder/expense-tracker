import { useEffect, useState } from "react";

import api from "../lib/axios.js";
import { API_PATHS } from "../utils/apiPaths.js";
import AuthContext from "./AuthContext.jsx";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check if user is already logged in
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get(API_PATHS.AUTH.ME);
        setUser(res.data.user);
      } catch (error) {
        console.log(error.message);

        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  // Login
  const login = async (email, password) => {
    const res = await api.post(API_PATHS.AUTH.LOGIN, {
      email,
      password,
    });
    setUser(res.data.user);
  };

  // Register
  const register = async (payload) => {
    const res = await api.post(API_PATHS.AUTH.REGISTER, payload);
    setUser(res.data.user);
  };

  // Logout
  const logout = async () => {
    try {
      await api.post(API_PATHS.AUTH.LOGOUT);
    } catch (error) {
      console.error(error);
    }
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
