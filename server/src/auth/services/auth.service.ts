import { BadRequestException, Injectable, UnauthorizedException } from "@nestjs/common";
import { User } from "@prisma/client";
import bcrypt from "bcrypt";
import { LoginResponseDTO, RefreshTokenPayload } from "../dto/token.dto";
import { CreateUserRequestDTO } from "../dto/user.dto";
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
    const user = await this.userRepository.findByEmail(email);

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

    const user = await this.userRepository.findById(decodedToken.id);

    if (!user) {
      throw new UnauthorizedException();
    }

    return this.jwtService.createTokens(user);
  }

  async register(dto: CreateUserRequestDTO): Promise<LoginResponseDTO> {
    const userAlreadyExist = await this.userRepository.findByEmail(dto.email);

    if (userAlreadyExist !== null) {
      throw new BadRequestException("Usuário já existe");
    }

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(dto.password, salt);

    const createdUser = await this.userRepository.create({
      email: dto.email,
      name: dto.name,
      password: hashedPassword,
    });

    return this.jwtService.createTokens(createdUser);
  }
}
