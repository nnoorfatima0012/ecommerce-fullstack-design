// //client/src/context/AuthContext.jsx
// import { createContext, useContext, useEffect, useState } from "react";
// import API from "../api/api";

// const AuthContext = createContext();

// export function AuthProvider({ children }) {
//   const [user, setUser] = useState(null);
//   const [accessToken, setAccessToken] = useState(null);
//   const [authLoading, setAuthLoading] = useState(true);

//   const register = async (formData) => {
//     const res = await API.post("/auth/register", formData);
//     setUser(res.data.user);
//     setAccessToken(res.data.accessToken);
//     return res.data;
//   };

//   const login = async (formData) => {
//     const res = await API.post("/auth/login", formData);
//     setUser(res.data.user);
//     setAccessToken(res.data.accessToken);
//     return res.data;
//   };

//   const logout = async () => {
//     await API.post("/auth/logout");
//     setUser(null);
//     setAccessToken(null);
//   };

// const updateProfile = async (profileData) => {
//   const res = await API.patch("/auth/profile", profileData);
//   setUser(res.data.user);
//   return res.data;
// };

//   const refreshAuth = async () => {
//     try {
//       const res = await API.post("/auth/refresh");
//       setUser(res.data.user);
//       setAccessToken(res.data.accessToken);
//     } catch (error) {
//       setUser(null);
//       setAccessToken(null);
//     } finally {
//       setAuthLoading(false);
//     }
//   };  
//   useEffect(() => {
//   const requestInterceptor = API.interceptors.request.use((config) => {
//     if (accessToken) {
//       config.headers.Authorization = `Bearer ${accessToken}`;
//     }

//     return config;
//   });

//   const responseInterceptor = API.interceptors.response.use(
//     (response) => response,
//     async (error) => {
//       const originalRequest = error.config;

//       if (
//         error.response?.status === 401 &&
//         !originalRequest._retry
//       ) {
//         originalRequest._retry = true;

//         try {
//           const res = await API.post("/auth/refresh");

//           setUser(res.data.user);
//           setAccessToken(res.data.accessToken);

//           originalRequest.headers.Authorization = `Bearer ${res.data.accessToken}`;

//           return API(originalRequest);
//         } catch (refreshError) {
//           setUser(null);
//           setAccessToken(null);
//           return Promise.reject(refreshError);
//         }
//       }

//       return Promise.reject(error);
//     }
//   );

//   return () => {
//     API.interceptors.request.eject(requestInterceptor);
//     API.interceptors.response.eject(responseInterceptor);
//   };
// }, [accessToken]);

//   useEffect(() => {
//     refreshAuth();
//   }, []);

//   return (
//     <AuthContext.Provider
//       value={{
//         user,
//         accessToken,
//         authLoading,
//         isAuthenticated: !!user,
//         isAdmin: user?.role === "admin",
//         register,
//         login,
//         logout,
//         refreshAuth,
//         updateProfile,
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// }

// export function useAuth() {
//   return useContext(AuthContext);
// }


import { createContext, useContext, useEffect, useRef, useState } from "react";
import API from "../api/api";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  const accessTokenRef = useRef(null);
  const isRefreshingRef = useRef(false);

  const saveAuth = (userData, token) => {
    setUser(userData);
    setAccessToken(token);
    accessTokenRef.current = token;
  };

  const clearAuth = () => {
    setUser(null);
    setAccessToken(null);
    accessTokenRef.current = null;
  };

  const register = async (formData) => {
    const res = await API.post("/auth/register", formData);
    saveAuth(res.data.user, res.data.accessToken);
    return res.data;
  };

  const login = async (formData) => {
    const res = await API.post("/auth/login", formData);
    saveAuth(res.data.user, res.data.accessToken);
    return res.data;
  };

  const logout = async () => {
    try {
      await API.post("/auth/logout");
    } finally {
      clearAuth();
    }
  };

  const refreshAuth = async () => {
    try {
      const res = await API.post("/auth/refresh");
      saveAuth(res.data.user, res.data.accessToken);
      return res.data;
    } catch (error) {
      clearAuth();
      throw error;
    }
  };

  const updateProfile = async (profileData) => {
    const res = await API.patch("/auth/profile", profileData);
    setUser(res.data.user);
    return res.data;
  };

  useEffect(() => {
    const requestInterceptor = API.interceptors.request.use((config) => {
      const token = accessTokenRef.current;

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      return config;
    });

    const responseInterceptor = API.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;

        if (!originalRequest) {
          return Promise.reject(error);
        }

        // Important: never refresh again for auth refresh/login/logout/register requests
        const isAuthRequest =
          originalRequest.url?.includes("/auth/refresh") ||
          originalRequest.url?.includes("/auth/login") ||
          originalRequest.url?.includes("/auth/register") ||
          originalRequest.url?.includes("/auth/logout");

        if (isAuthRequest) {
          return Promise.reject(error);
        }

        if (
          error.response?.status === 401 &&
          !originalRequest._retry &&
          !isRefreshingRef.current
        ) {
          originalRequest._retry = true;
          isRefreshingRef.current = true;

          try {
            const res = await API.post("/auth/refresh");

            saveAuth(res.data.user, res.data.accessToken);

            originalRequest.headers.Authorization = `Bearer ${res.data.accessToken}`;

            return API(originalRequest);
          } catch (refreshError) {
            clearAuth();
            return Promise.reject(refreshError);
          } finally {
            isRefreshingRef.current = false;
          }
        }

        return Promise.reject(error);
      }
    );

    return () => {
      API.interceptors.request.eject(requestInterceptor);
      API.interceptors.response.eject(responseInterceptor);
    };
  }, []);

  useEffect(() => {
    const initAuth = async () => {
      try {
        await refreshAuth();
      } catch (error) {
        clearAuth();
      } finally {
        setAuthLoading(false);
      }
    };

    initAuth();
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
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}