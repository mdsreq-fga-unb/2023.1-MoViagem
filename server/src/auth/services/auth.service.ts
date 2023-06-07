import { Injectable, UnauthorizedException } from "@nestjs/common";
import { User } from "@prisma/client";
import { EnvironmentService } from "../../environment/services/environment.service";
import { LoginResponseDTO, TokenPayload } from "../dto/token.dto";
import { UserRepository } from "../repositories/user.repository";
import { JwtService } from "./jwt.service";
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

  async triggerAfterLocalLogin(user: User): Promise<LoginResponseDTO> {
    const accessToken = this.jwtService.createAccessToken({
      id: user.id,
      email: user.email,
      name: user.name,
    });

    const refreshToken = this.jwtService.createRefreshToken({
      id: user.id,
      email: user.email,
      name: user.name,
    });

    return {
      accessToken,
      refreshToken,
      user,
    };
  }

  async refreshToken(receivedRefreshToken: string): Promise<LoginResponseDTO> {
    let decodedToken: TokenPayload;

    try {
      decodedToken = await this.jwtService.verify(receivedRefreshToken);
    } catch (err) {
      throw new UnauthorizedException();
    }

    const accessToken = this.jwtService.createAccessToken({
      id: decodedToken.user.id,
      email: decodedToken.user.email,
      name: decodedToken.user.name,
    });

    const refreshToken = this.jwtService.createRefreshToken({
      id: decodedToken.user.id,
      email: decodedToken.user.email,
      name: decodedToken.user.name,
    });

    return {
      accessToken,
      refreshToken,
      user: decodedToken.user,
    };
  }
}
