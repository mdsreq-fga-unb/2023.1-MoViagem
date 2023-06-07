import { BadRequestException, Injectable } from "@nestjs/common";
import bcrypt from "bcrypt";
import { LoginResponseDTO } from "../dto/token.dto";
import { UserCreateDTO } from "../dto/user.dto";
import { UserRepository } from "../repositories/user.repository";
import { JwtService } from "./jwt.service";

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository, private jwtService: JwtService) {}

  async register(user: UserCreateDTO): Promise<LoginResponseDTO> {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(user.password, salt);

    const userAlreadyExist = await this.userRepository.findUserByEmail(user.email);

    if (userAlreadyExist !== null) {
      throw new BadRequestException("Usuário já existe");
    }

    const createdUser = await this.userRepository.createUser({
      email: user.email,
      name: user.name,
      password: hashedPassword,
    });

    return this.jwtService.createTokens(createdUser);
  }

  async comparePassword(plainPassword: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(plainPassword, hashedPassword);
  }
}
