import axios from "axios";
import request from "../api-instance";
import {
  LoginResponseDTO,
  RefreshTokenRequestDTO,
  UserCreateDTO,
  UserEditEmailDTO,
  UserEditNameDTO,
  UserEditPasswordDTO,
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
export function editEmail(body: UserEditEmailDTO, id: string) {
  return request<UserEditEmailDTO, void>({
    method: "PUT",
    url: `editEmail/${id}`,
    body,
    alternativeInstance: authApi,
  });
}
export function editPassword(body: UserEditPasswordDTO, id: string) {
  return request<UserEditPasswordDTO, void>({
    method: "PUT",
    url: `editPassword/${id}`,
    body,
    alternativeInstance: authApi,
  });
}
export function deleteAccount(id: string) {
  return request<never, never>({
    method: "DELETE",
    url: `deleteUser/${id}`,
    alternativeInstance: authApi,
  });
}
