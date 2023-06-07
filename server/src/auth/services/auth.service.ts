import { Injectable, UnauthorizedException } from "@nestjs/common";
import { User } from "@prisma/client";
import { LoginResponseDTO, RefreshTokenPayload } from "../dto/token.dto";
import { UserRepository } from "../repositories/user.repository";
import { JwtService } from "./jwt.service";
import { UserService } from "./user.service";

@Injectable()
export class AuthService {
  constructor(
    private userRepository: UserRepository,
    private userService: UserService,
    private jwtService: JwtService
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
    return this.jwtService.createTokens(user);
  }

  async refreshToken(receivedRefreshToken: string): Promise<LoginResponseDTO> {
    let decodedToken: RefreshTokenPayload;

    try {
      decodedToken = this.jwtService.verify<RefreshTokenPayload>(receivedRefreshToken);
    } catch (err) {
      throw new UnauthorizedException();
    }

    const user = await this.userRepository.findUserById(decodedToken.id);

    if (!user) {
      throw new UnauthorizedException();
    }

    return this.jwtService.createTokens(user);
  }
}
