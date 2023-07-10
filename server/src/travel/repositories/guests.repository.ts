import { Injectable } from "@nestjs/common";
import { Guests, Prisma } from "@prisma/client";
import { PrismaService } from "src/prisma/services/prisma.service";

@Injectable()
export class GuestsRepository {
  constructor(private prismaService: PrismaService) {}

  async create(data: Prisma.GuestsCreateInput): Promise<Guests> {
    return await this.prismaService.guests.create({
      data,
    });
  }

  // Para buscar

  //   async findById(id: number): Promise<Guests | null> {
  //     return await this.prismaService.guests.findUnique({
  //       where: {
  //         id,
  //       },
  //     });
  //   }

  async deleteById(id: number): Promise<void> {
    await this.prismaService.guests.delete({
      where: {
        id,
      },
    });
  }
}
