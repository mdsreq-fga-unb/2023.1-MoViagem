import { IsJWT } from "class-validator";
import { UserInTokenDTO } from "./user.dto";

export class LoginResponseDTO {
  accessToken: string;
  refreshToken: string;
  user: UserInTokenDTO;
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
  user: UserInTokenDTO;
}

export class RefreshTokenPayload extends TokenPayload {
  id: number;
}
