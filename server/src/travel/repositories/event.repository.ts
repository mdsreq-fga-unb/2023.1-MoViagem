import { Injectable } from "@nestjs/common";
import { Event, Prisma } from "@prisma/client";
import { PrismaService } from "src/prisma/services/prisma.service";

@Injectable()
export class EventRepository {
  constructor(private prismaService: PrismaService) {}

  async create(data: Prisma.EventCreateInput): Promise<Event> {
    return await this.prismaService.event.create({
      data,
    });
  }

  async update(id: number, data: Prisma.EventUpdateInput): Promise<Event> {
    return await this.prismaService.event.update({
      where: {
        id,
      },
      data,
    });
  }

  async findById(id: number): Promise<Event | null> {
    return await this.prismaService.event.findUnique({
      where: {
        id,
      },
    });
  }
}