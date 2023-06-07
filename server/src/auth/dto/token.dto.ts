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
  user: UserInfoDTO;
  iat: number;
  exp: number;
}
