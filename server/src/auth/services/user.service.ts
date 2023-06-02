import { Injectable } from "@nestjs/common";
import * as bcrypt from "bcrypt";
import { PrismaService } from "../../prisma/services/prisma.service";
import { UserCreateDTO, UserResponseDTO } from "../dto/user.dto";

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async register(user: UserCreateDTO): Promise<UserResponseDTO> {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(user.password, salt);

    const createdUser = await this.prisma.user.create({
      data: {
        email: user.email,
        name: user.name,
        password: hashedPassword,
      },
    });

    return new UserResponseDTO(createdUser);
  }

  async comparePassword(plainPassword: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(plainPassword, hashedPassword);
  }
}
