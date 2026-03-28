import { createContext, useContext, useEffect, useMemo, useState } from "react";

import api from "../services/api";

const AuthContext = createContext(null);

function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem("crm_token"));
  const [admin, setAdmin] = useState(() => {
    const savedAdmin = localStorage.getItem("crm_admin");
    return savedAdmin ? JSON.parse(savedAdmin) : null;
  });
  const [isLoading, setIsLoading] = useState(Boolean(token));

  useEffect(() => {
    const loadAdmin = async () => {
      if (!token) {
        setIsLoading(false);
        return;
      }

      try {
        const response = await api.get("/auth/me");
        setAdmin(response.data.admin);
        localStorage.setItem("crm_admin", JSON.stringify(response.data.admin));
      } catch (error) {
        localStorage.removeItem("crm_token");
        localStorage.removeItem("crm_admin");
        setToken(null);
        setAdmin(null);
      } finally {
        setIsLoading(false);
      }
    };

    loadAdmin();
  }, [token]);

  const login = async (credentials) => {
    const response = await api.post("/auth/login", credentials);
    const nextToken = response.data.token;
    const nextAdmin = response.data.admin;

    localStorage.setItem("crm_token", nextToken);
    localStorage.setItem("crm_admin", JSON.stringify(nextAdmin));

    setToken(nextToken);
    setAdmin(nextAdmin);
  };

  const logout = () => {
    localStorage.removeItem("crm_token");
    localStorage.removeItem("crm_admin");
    setToken(null);
    setAdmin(null);
  };

  const value = useMemo(
    () => ({
      token,
      admin,
      isLoading,
      isAuthenticated: Boolean(token && admin),
      login,
      logout
    }),
    [token, admin, isLoading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };
