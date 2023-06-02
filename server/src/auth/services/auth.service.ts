import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { User } from "@prisma/client";
import { addSeconds } from "date-fns";
import { v4 as uuidV4 } from "uuid";
import { EnvironmentService } from "../../environment/services/environment.service";
import { LoginResponseDTO, RefreshTokenPayload } from "../dto/token.dto";
import { UserInRequest } from "../dto/user.dto";
import { UserRepository } from "../repositories/user.repository";
import { UserService } from "./user.service";

@Injectable()
export class AuthService {
  constructor(
    private userRepository: UserRepository,
    private userService: UserService,
    private jwtService: JwtService,
    private env: EnvironmentService
  ) {}

  async validateCredentialsAndGetUser(email: string, password: string): Promise<User | null> {
    const user = await this.userRepository.findUserByEmail(email);

    if (!user) {
      return null;
    }

    const isPasswordValid = await this.userService.comparePassword(password, user.password);

    if (!isPasswordValid) {
      return null;
    }

    return user;
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
