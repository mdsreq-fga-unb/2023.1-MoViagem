export interface LoginResponseDTO {
  accessToken: string;
  refreshToken: string;
  expirationDate: Date;
}

export interface RefreshTokenRequestDTO {
  refreshToken: string;
}

export interface UserLoginDTO {
  email: string;
  password: string;
}
