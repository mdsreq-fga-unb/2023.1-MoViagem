import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/services/prisma.service";

@Injectable()
export class EventGuestsRepository {
  constructor(private prismaService: PrismaService) {}

  async addGuestToEvent(userId: number, eventId: number): Promise<void> {
    await this.prismaService.eventGuests.create({
      data: {
        userId,
        eventId,
      },
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

  async removeGuestFromEvent(userId: number, eventId: number): Promise<void> {
    await this.prismaService.eventGuests.delete({
      where: {
        userId_eventId: {
          userId,
          eventId,
        },
      },
    });
  }
}
