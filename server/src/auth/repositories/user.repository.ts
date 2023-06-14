import { Injectable } from "@nestjs/common";
import { Prisma, User } from "@prisma/client";
import { PrismaService } from "../../prisma/services/prisma.service";
import { UserEditDTO, UserEditNameDTO } from "../dto/user.dto";

@Injectable()
export class UserRepository {
  constructor(private prismaService: PrismaService) {}

  async findUserByEmail(email: string): Promise<User | null> {
    return this.prismaService.user.findUnique({
      where: { email },
    });
  }

  async findUserById(id: number): Promise<User | null> {
    return this.prismaService.user.findUnique({
      where: { id },
    });
  }

  async createUser(data: Prisma.UserCreateInput): Promise<User> {
    return await this.prismaService.user.create({
      data,
    });
  }

  async UpdateUser(data: UserEditDTO, id: string): Promise<void> {
    await this.prismaService.user.update({
      data: {
        email: data.email,
      },
      where: {
        id: parseInt(id),
      },
    });
  }

  async UpdateName(data: UserEditNameDTO, id: string): Promise<void> {
    console.log("id:", id);
    await this.prismaService.user.update({
      data: {
        name: data.name,
      },
      where: {
        id: parseInt(id),
      },
    });
  }

  async updatePassword(data: string, id: string): Promise<void> {
    console.log("nova senha na query", data);
    await this.prismaService.user.update({
      data: {
        password: data,
      },
      where: {
        id: parseInt(id),
      },
    });
  }
}
