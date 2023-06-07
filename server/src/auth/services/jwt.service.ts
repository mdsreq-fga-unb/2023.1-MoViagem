import { Injectable } from "@nestjs/common";
import { JwtService as NestJwtService } from "@nestjs/jwt";
import { EnvironmentService } from "src/environment/services/environment.service";
import {
  AccessTokenPayload,
  LoginResponseDTO,
  RefreshTokenPayload,
  TokenPayload,
  UserInfoDTO,
} from "../dto/token.dto";

@Injectable()
export class JwtService {
  constructor(private env: EnvironmentService, private nestJwtService: NestJwtService) {}

  createAccessToken(user: UserInfoDTO): string {
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

  createTokens(user: UserInfoDTO): LoginResponseDTO {
    const accessToken = this.createAccessToken(user);
    const refreshToken = this.createRefreshToken(user.id);

    return {
      accessToken,
      refreshToken,
      user,
    };
  }
}
