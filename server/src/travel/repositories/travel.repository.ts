import { Injectable } from "@nestjs/common";
import { Prisma, Travel } from "@prisma/client";
import { PrismaService } from "src/prisma/services/prisma.service";
import { TravelWithInfo } from "../dto/travel.dto";

@Injectable()
export class TravelRepository {
  constructor(private prismaService: PrismaService) {}

  async create(data: Prisma.TravelCreateInput): Promise<Travel> {
    return await this.prismaService.travel.create({
      data,
    });
  }

  async findById(id: number): Promise<Travel | null> {
    return await this.prismaService.travel.findUnique({
      where: {
        id,
      },
    });
  }

  async update(id: number, data: Prisma.TravelUpdateInput) {
    return this.prismaService.travel.update({
      where: {
        id,
      },
      data,
    });
  }

  async findAllByUser(userId: number): Promise<Travel[]> {
    return await this.prismaService.travel.findMany({
      where: {
        userId,
      },
    });
  }

  async findByIdIncludingHostAndTransport(id: number): Promise<TravelWithInfo | null> {
    return await this.prismaService.travel.findUnique({
      where: {
        id,
      },
      include: {
        host: true,
        transport: true,
      },
    });
  }
}
