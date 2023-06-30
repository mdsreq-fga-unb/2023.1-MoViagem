import { Injectable } from "@nestjs/common";
import { Prisma, User } from "@prisma/client";
import { PrismaService } from "../../prisma/services/prisma.service";

@Injectable()
export class UserRepository {
  constructor(private prismaService: PrismaService) {}

  async findByEmail(email: string): Promise<User | null> {
    return this.prismaService.user.findUnique({
      where: { email },
    });
  }

  async findById(id: number): Promise<User | null> {
    return this.prismaService.user.findUnique({
      where: { id },
    });
  }

  async create(data: Prisma.UserCreateInput): Promise<User> {
    return await this.prismaService.user.create({
      data,
    });
  }

  async update(id: number, data: Prisma.UserUpdateInput): Promise<void> {
    await this.prismaService.user.update({
      where: {
        id,
      },
      data,
    });
  }

  async deleteById(id: number): Promise<void> {
    await this.prismaService.user.delete({
      where: {
        id,
      },
    });
  }
}
