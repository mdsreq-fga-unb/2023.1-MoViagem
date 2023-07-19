import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/services/prisma.service";
import { EventGuestInfo } from "../dto/eventguests.dto";

@Injectable()
export class EventGuestsRepository {
  constructor(private prismaService: PrismaService) {}

  async findAllFromEvent(eventId: number): Promise<EventGuestInfo[]> {
    return await this.prismaService.eventGuests.findMany({
      where: {
        eventId,
      },
      select: {
        user: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
  }

  async addGuestToEvent(userId: number, eventId: number): Promise<void> {
    await this.prismaService.eventGuests.create({
      data: {
        userId,
        eventId,
      },
    });
  }

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
