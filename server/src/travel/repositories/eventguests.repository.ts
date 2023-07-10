import { Injectable } from "@nestjs/common";
import { EventGuests, Prisma } from "@prisma/client";
import { PrismaService } from "src/prisma/services/prisma.service";

@Injectable()
export class EventGuestsRepository {
  constructor(private prismaService: PrismaService) {}

  async create(data: Prisma.EventGuestsCreateInput): Promise<EventGuests> {
    return await this.prismaService.eventGuests.create({
      data,
    });
  }

  // Para buscar

  //   async findById(id: number): Promise<EventGuests | null> {
  //     return await this.prismaService.eventGuests.findUnique({
  //       where: {
  //         id,
  //       },
  //     });
  //   }

  async deleteById(id: number): Promise<void> {
    await this.prismaService.eventGuests.delete({
      where: {
        id,
      },
    });
  }
}
