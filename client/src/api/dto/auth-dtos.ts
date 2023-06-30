export interface UserInTokenDTO {
  id: number;
  email: string;
  name: string;
}

// Request DTOs

export interface RefreshTokenRequestDTO {
  refreshToken: string;
}

export interface LoginRequestDTO {
  email: string;
  password: string;
}

export interface CreateUserRequestDTO {
  email: string;
  name: string;
  password: string;
}

// Response DTOs

export interface LoginResponseDTO {
  accessToken: string;
  refreshToken: string;
  user: UserInTokenDTO;
}
