import { IsJWT } from "class-validator";

export class UserInfoDTO {
  id: number;
  email: string;
  name: string;
}

export class LoginResponseDTO {
  accessToken: string;
  refreshToken: string;
  user: UserInfoDTO;
}

export class RefreshTokenRequestDTO {
  @IsJWT()
  refreshToken: string;
}

export class TokenPayload {
  iat: number;
  exp: number;
}

export class AccessTokenPayload extends TokenPayload {
  user: UserInfoDTO;
}

export class RefreshTokenPayload extends TokenPayload {
  id: number;
}
