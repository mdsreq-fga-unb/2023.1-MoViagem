import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from "axios";
import { requestTokenRefresh } from "./requests/auth-requests";

export class SuccessResponse<T> {
  data: T;
  status: number;

  constructor(data: T, status: number) {
    this.data = data;
    this.status = status;
  }
}

export class ErrorResponse {
  message: string;
  status: number;
  originalError: AxiosError;

  constructor(message: string, status: number, originalError: AxiosError) {
    this.message = message;
    this.status = status;
    this.originalError = originalError;
  }
}

export const apiInstance = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL || "http://localhost:8000"}/api`,
  headers: {
    "Content-Type": "application/json",
  },
});

apiInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

apiInstance.interceptors.response.use(undefined, async (error) => {
  const status = error.response?.status;
  const config = error.config;

  if (status !== 401 || config === undefined) {
    throw error;
  }

  const refreshToken = localStorage.getItem("refreshToken");

  if (!refreshToken) {
    alert("Please login again.");
    window.location.href = "/login-and-register";
    throw error;
  }

  const response = await requestTokenRefresh({ refreshToken });

  if (response instanceof ErrorResponse) {
    alert("Please login again.");
    window.location.href = "/login-and-register";
    throw response.originalError;
  }

  const { accessToken, refreshToken: newRefreshToken } = response.data;

  localStorage.setItem("accessToken", accessToken);
  localStorage.setItem("refreshToken", newRefreshToken);

  return await apiInstance.request(config);
});

export interface RequestParams<ENTRY> {
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  url: string;
  body?: ENTRY;
  config?: AxiosRequestConfig;
  alternativeInstance?: AxiosInstance;
}

export default async function request<ENTRY, EXIT>({
  method,
  url,
  body,
  config,
  alternativeInstance,
}: RequestParams<ENTRY>): Promise<SuccessResponse<EXIT> | ErrorResponse> {
  const instance = alternativeInstance ?? apiInstance;

  try {
    const response = await instance.request<EXIT>({
      ...config,
      method,
      url,
      data: body,
    });

    return new SuccessResponse<EXIT>(response.data, response.status);
  } catch (e) {
    if (e instanceof AxiosError) {
      return new ErrorResponse(e.response?.data.message, e.response?.status ?? 500, e);
    } else {
      throw e;
    }
  }
}
