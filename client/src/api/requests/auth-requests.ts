import axios from "axios";
import request from "../api-instance";
import {
  CreateUserRequestDTO,
  LoginRequestDTO,
  LoginResponseDTO,
  RefreshTokenRequestDTO,
} from "../dto/auth-dtos";

const authApi = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL || "http://localhost:8000"}/auth`,
  headers: {
    "Content-Type": "application/json",
  },
});

export function requestLogin(body: LoginRequestDTO) {
  return request<LoginRequestDTO, LoginResponseDTO>({
    method: "POST",
    url: "login",
    body,
    alternativeInstance: authApi,
  });
}

export function requestTokenRefresh(body: RefreshTokenRequestDTO) {
  return request<RefreshTokenRequestDTO, LoginResponseDTO>({
    method: "POST",
    url: "refresh",
    body,
    alternativeInstance: authApi,
  });
}

export function requestRegister(body: CreateUserRequestDTO) {
  return request<CreateUserRequestDTO, LoginResponseDTO>({
    method: "POST",
    url: "register",
    body,
    alternativeInstance: authApi,
  });
}
