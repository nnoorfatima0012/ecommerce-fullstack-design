import { createContext, useContext, useEffect, useState } from "react";
import API from "../api/api";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  const register = async (formData) => {
    const res = await API.post("/auth/register", formData);
    setUser(res.data.user);
    setAccessToken(res.data.accessToken);
    return res.data;
  };

  const login = async (formData) => {
    const res = await API.post("/auth/login", formData);
    setUser(res.data.user);
    setAccessToken(res.data.accessToken);
    return res.data;
  };

  const logout = async () => {
    await API.post("/auth/logout");
    setUser(null);
    setAccessToken(null);
  };

  const refreshAuth = async () => {
    try {
      const res = await API.post("/auth/refresh");
      setUser(res.data.user);
      setAccessToken(res.data.accessToken);
    } catch (error) {
      setUser(null);
      setAccessToken(null);
    } finally {
      setAuthLoading(false);
    }
  };  
  useEffect(() => {
  const requestInterceptor = API.interceptors.request.use((config) => {
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  });

  const responseInterceptor = API.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;

      if (
        error.response?.status === 401 &&
        !originalRequest._retry
      ) {
        originalRequest._retry = true;

        try {
          const res = await API.post("/auth/refresh");

          setUser(res.data.user);
          setAccessToken(res.data.accessToken);

          originalRequest.headers.Authorization = `Bearer ${res.data.accessToken}`;

          return API(originalRequest);
        } catch (refreshError) {
          setUser(null);
          setAccessToken(null);
          return Promise.reject(refreshError);
        }
      }

      return Promise.reject(error);
    }
  );

  return () => {
    API.interceptors.request.eject(requestInterceptor);
    API.interceptors.response.eject(responseInterceptor);
  };
}, [accessToken]);

  useEffect(() => {
    refreshAuth();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        accessToken,
        authLoading,
        isAuthenticated: !!user,
        isAdmin: user?.role === "admin",
        register,
        login,
        logout,
        refreshAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}