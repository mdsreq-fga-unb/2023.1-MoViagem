import { BadRequestException, Injectable } from "@nestjs/common";
import bcrypt from "bcrypt";
import { EditPasswordRequestDTO, EditUserRequestDTO } from "../dto/user.dto";
import { UserRepository } from "../repositories/user.repository";
import { JwtService } from "./jwt.service";

@Injectable()
export class UserService {
  constructor(
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async update(id: number, dto: EditUserRequestDTO): Promise<void> {
    return this.userRepository.update(id, {
      email: dto.email,
      name: dto.name,
    });
  }

  async comparePassword(plainPassword: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(plainPassword, hashedPassword);
  }

  async delete(id: number): Promise<void> {
    return this.userRepository.deleteById(id);
  }

  async updatePassword(id: number, dto: EditPasswordRequestDTO): Promise<void> {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new BadRequestException("Usuário não existe");
    }

    const isPasswordValid = await this.comparePassword(dto.currentPassword, user.password);

    if (!isPasswordValid) {
      throw new BadRequestException("Senha Atual inválida");
    }

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(dto.newPassword, salt);

    return this.userRepository.update(id, {
      password: hashedPassword,
    });
  }
}
