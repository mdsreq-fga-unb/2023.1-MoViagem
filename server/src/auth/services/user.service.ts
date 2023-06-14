import { BadRequestException, Injectable } from "@nestjs/common";
import bcrypt from "bcrypt";
import { LoginResponseDTO } from "../dto/token.dto";
import { UserCreateDTO, UserEditDTO, UserEditNameDTO, UserEditPasswordDTO } from "../dto/user.dto";
import { UserRepository } from "../repositories/user.repository";
import { JwtService } from "./jwt.service";

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository, private jwtService: JwtService) {}

  async register(user: UserCreateDTO): Promise<LoginResponseDTO> {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(user.password, salt);

    const userAlreadyExist = await this.userRepository.findUserByEmail(user.email);

    console.log(userAlreadyExist);

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

  async editUser(paramater: UserEditDTO, id: string): Promise<void> {
    return this.userRepository.UpdateUser(paramater, id);
  }

  async editName(params: UserEditNameDTO, id: string): Promise<void> {
    return this.userRepository.UpdateName(params, id);
  }

  async comparePassword(plainPassword: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(plainPassword, hashedPassword);
  }

  async editPassword(params: UserEditPasswordDTO, id: string): Promise<void> {
    const user = await this.userRepository.findUserById(parseInt(id));

    if (!user) {
      throw new BadRequestException("Usuário não existe");
    }
    const isPasswordValid = await this.comparePassword(params.currentPassword, user.password);

    if (!isPasswordValid) {
      throw new BadRequestException("Senha Atual inválida");
    } else {
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(params.newPassword, salt);

      return this.userRepository.updatePassword(hashedPassword, id);
    }
  }
}
