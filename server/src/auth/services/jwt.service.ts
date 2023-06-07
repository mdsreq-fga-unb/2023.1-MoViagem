import { Injectable } from "@nestjs/common";
import jwt from "jsonwebtoken";
import { EnvironmentService } from "src/environment/services/environment.service";
import { TokenPayload, UserInfoDTO } from "../dto/token.dto";

@Injectable()
export class JwtService {
  constructor(private env: EnvironmentService) {}

  createAccessToken(user: UserInfoDTO): string {
    return jwt.sign(user, this.env.jwtSecret, { expiresIn: this.env.jwtExpiresInSeconds });
  }

  createRefreshToken(user: UserInfoDTO): string {
    return jwt.sign(user, this.env.jwtSecret, { expiresIn: this.env.jwtRefreshExpiresInSeconds });
  }

  verify<T = TokenPayload>(token: string): T {
    return jwt.verify(token, this.env.jwtSecret) as T;
  }
}
