import { IsJWT } from "class-validator";

export class LoginResponseDTO {
  accessToken: string;
  refreshToken: string;
  expirationDate: Date;
}

export class RefreshTokenRequestDTO {
  @IsJWT()
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
