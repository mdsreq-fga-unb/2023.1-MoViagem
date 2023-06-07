import axios from "axios";
import { requestTokenRefresh } from "./requests/auth-requests";

const api = axios.create({
  baseURL: "http://localhost:8000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

function refreshFailed() {
  alert("Please login again.");
  window.location.href = "/login-and-register";
}

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const status = error.response?.status;
    const config = error.config;

    if (status !== 401 || config === undefined) {
      throw error;
    }

    const refreshToken = localStorage.getItem("refreshToken");

    if (!refreshToken) {
      refreshFailed();
      throw error;
    }

    try {
      const response = await requestTokenRefresh({ refreshToken });

      if (response.status !== 201) {
        throw error;
      }
      const { accessToken, refreshToken: newRefreshToken } = response.data;

      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", newRefreshToken);
    } catch (e) {
      refreshFailed();
      throw e;
    }

    return await api.request(config);
  }
);

export default api;
