import { BadRequestException, Injectable } from "@nestjs/common";
import bcrypt from "bcrypt";
import { UserCreateDTO, UserResponseDTO } from "../dto/user.dto";
import { UserRepository } from "../repositories/user.repository";

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}

  async register(user: UserCreateDTO): Promise<UserResponseDTO> {
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

    return new UserResponseDTO(createdUser);
  }

  async comparePassword(plainPassword: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(plainPassword, hashedPassword);
  }
}
