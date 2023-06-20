import { Injectable } from "@nestjs/common";
import { Event, Prisma } from "@prisma/client";
import { PrismaService } from "src/prisma/services/prisma.service";

@Injectable()
export class EventRepository {
  constructor(private prismaService: PrismaService) {}

  async createEvent(data: Prisma.EventCreateInput): Promise<Event> {
    return await this.prismaService.event.create({
      data,
    });
  }

  async updateEvent(id: number, data: Prisma.EventUpdateInput): Promise<Event> {
    return await this.prismaService.event.update({
      where: {
        id,
      },
      data,
    });
  }

  async getEvent(id: number): Promise<Event | null> {
    const event = await this.prismaService.event.findUnique({
      where: {
        id: id,
      },
    });
    return event;
  }
}
