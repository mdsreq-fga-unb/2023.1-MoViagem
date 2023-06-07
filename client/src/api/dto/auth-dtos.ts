export interface UserInfo {
  id: number;
  email: string;
  name: string;
}

export interface LoginResponseDTO {
  accessToken: string;
  refreshToken: string;
  user: UserInfo;
}

export interface RefreshTokenRequestDTO {
  refreshToken: string;
}

export interface UserLoginDTO {
  email: string;
  password: string;
}

export interface UserCreateDTO {
  email: string;
  name: string;
  password: string;
}

export interface UserResponseDTO {
  id: number;
  email: string;
  name: string;
}
