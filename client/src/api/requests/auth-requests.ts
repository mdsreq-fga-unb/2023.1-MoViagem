import axios from "axios";
import request from "../api-instance";
import {
  LoginResponseDTO,
  RefreshTokenRequestDTO,
  UserCreateDTO,
  UserEditNameDTO,
  UserLoginDTO,
} from "../dto/auth-dtos";

const authApi = axios.create({
  baseURL: "http://localhost:8000/auth",
  headers: {
    "Content-Type": "application/json",
  },
});

export function requestLogin(body: UserLoginDTO) {
  return request<UserLoginDTO, LoginResponseDTO>({
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

export function register(body: UserCreateDTO) {
  return request<UserCreateDTO, LoginResponseDTO>({
    method: "POST",
    url: "register",
    body,
    alternativeInstance: authApi,
  });
}

export function editName(body: UserEditNameDTO, id: string) {
  return request<UserEditNameDTO, void>({
    method: "PUT",
    url: `editName/${id}`,
    body,
    alternativeInstance: authApi,
  });
}
