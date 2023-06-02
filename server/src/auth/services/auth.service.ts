import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { EnvironmentService } from "src/environment/services/environment.service";
import { LoginResponseDTO, RefreshTokenPayload } from "../dto/token.dto";
import { UserService } from "./user.service";
import { v4 as uuidV4 } from "uuid";
import { addSeconds } from "date-fns";
import { UserInRequest } from "../dto/user.dto";
import { PrismaService } from "../../prisma/services/prisma.service";
import { User } from "@prisma/client";

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private userService: UserService,
    private jwtService: JwtService,
    private env: EnvironmentService
  ) {}

  async validateCredentialsAndGetUser(email: string, password: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({ where: { email } });

    if (user && (await this.userService.comparePassword(password, user.password))) {
      user.password = "";
      return user;
    }

    return null;
  }

  async triggerAfterLocalLogin(user: UserInRequest): Promise<LoginResponseDTO> {
    const accessToken = await this.jwtService.signAsync(
      {},
      {
        expiresIn: this.env.jwtExpiresInSeconds,
        subject: user.id.toString(),
      }
    );

    const refreshToken = await this.jwtService.signAsync(
      {},
      {
        expiresIn: this.env.jwtRefreshExpiresInSeconds,
        subject: user.id.toString(),
        jwtid: uuidV4(),
      }
    );

    const expirationDate = addSeconds(Date.now(), this.env.jwtExpiresInSeconds);

    return {
      accessToken,
      refreshToken,
      expirationDate,
    };
  }

  async refreshToken(receivedRefreshToken: string): Promise<LoginResponseDTO> {
    let decodedToken: RefreshTokenPayload | null = null;

    try {
      decodedToken = await this.jwtService.verifyAsync<RefreshTokenPayload>(receivedRefreshToken);
    } catch (err) {
      throw new UnauthorizedException();
    }

    const accessToken = await this.jwtService.signAsync(
      {},
      {
        expiresIn: this.env.jwtExpiresInSeconds,
        subject: decodedToken.sub,
      }
    );

    const refreshToken = await this.jwtService.signAsync(
      {},
      {
        expiresIn: this.env.jwtRefreshExpiresInSeconds,
        subject: decodedToken.sub,
        jwtid: uuidV4(),
      }
    );

    const expirationDate = addSeconds(Date.now(), this.env.jwtExpiresInSeconds);

    return {
      accessToken,
      refreshToken,
      expirationDate,
    };
  }
}
