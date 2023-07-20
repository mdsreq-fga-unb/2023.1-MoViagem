import { Injectable } from "@nestjs/common";
import { JwtService as NestJwtService } from "@nestjs/jwt";
import { EnvironmentService } from "src/environment/services/environment.service";
import {
  AccessTokenPayload,
  LoginResponseDTO,
  RefreshTokenPayload,
  TokenPayload,
} from "../dto/token.dto";
import { UserInTokenDTO } from "../dto/user.dto";

@Injectable()
export class JwtService {
  constructor(private env: EnvironmentService, private nestJwtService: NestJwtService) {}

  createAccessToken(user: UserInTokenDTO): string {
    const payload: Omit<AccessTokenPayload, "iat" | "exp"> = {
      user: {
        email: user.email,
        id: user.id,
        name: user.name,
      },
    };

    return this.nestJwtService.sign(payload, { expiresIn: this.env.jwtExpiresInSeconds });
  }

  createRefreshToken(userId: number): string {
    const payload: Omit<RefreshTokenPayload, "iat" | "exp"> = {
      id: userId,
    };

    return this.nestJwtService.sign(payload, { expiresIn: this.env.jwtRefreshExpiresInSeconds });
  }

  verify<T extends TokenPayload>(token: string): T {
    return this.nestJwtService.verify<T>(token);
  }

  createTokens(user: UserInTokenDTO): LoginResponseDTO {
    const accessToken = this.createAccessToken(user);
    const refreshToken = this.createRefreshToken(user.id);

    return {
      accessToken,
      refreshToken,
      user,
    };
  }
}
