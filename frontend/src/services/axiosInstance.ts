import axios, { InternalAxiosRequestConfig } from "axios";
import Cookies from "js-cookie";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/",
  timeout: 15000,
});

api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = Cookies.get("access_token");
    if (token && config.headers) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.request.use(
  (config) => {
    console.log("Request:", config.method, config.url, config.data);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      const { config } = error;
      const excludedRoutes = [
        "/auth/requestPasswordReset",
        /\/auth\/passwordReset\/.+\/.+\//,
      ];

      const shouldExclude = excludedRoutes.some((route) => {
        if (route instanceof RegExp) {
          return route.test(config.url || "");
        }
        return config.url?.startsWith(route);
      });

      if (!shouldExclude) {
        console.error("Sesión expirada. Redirigiendo al login...");
        Cookies.remove("access_token");
        if (typeof window !== "undefined") {
          window.location.href = "/login";
        }
      }
    }
    return Promise.reject(error);
  }
);

export default api;
