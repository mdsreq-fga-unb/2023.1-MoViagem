export class LoginResponseDTO {
  accessToken: string;
  refreshToken: string;
  expirationDate: Date;
}

export class RefreshTokenRequestDTO {
  refreshToken: string;
}

export class AccessTokenPayload {
  sub: string;
  iat: number;
  exp: number;
}

export class RefreshTokenPayload extends AccessTokenPayload {
  jti: string;
}
