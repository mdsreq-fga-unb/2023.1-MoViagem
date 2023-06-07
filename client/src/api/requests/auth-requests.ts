import axios from "axios";
import {
  LoginResponseDTO,
  RefreshTokenRequestDTO,
  UserCreateDTO,
  UserLoginDTO,
  UserResponseDTO,
} from "../dto/auth-dtos";

const authApi = axios.create({
  baseURL: "http://localhost:8000/auth",
  headers: {
    "Content-Type": "application/json",
  },
});

export function requestTokenRefresh(body: RefreshTokenRequestDTO) {
  return authApi.post<LoginResponseDTO>("refresh", body);
}

export function requestLogin(body: UserLoginDTO) {
  return authApi.post<LoginResponseDTO>("login", body);
}

export function register(body: UserCreateDTO) {
  return authApi.post<UserResponseDTO>("register", body);
}
