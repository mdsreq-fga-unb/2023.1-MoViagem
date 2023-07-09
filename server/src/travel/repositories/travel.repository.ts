import { Injectable } from "@nestjs/common";
import { Prisma, Travel } from "@prisma/client";
import { PrismaService } from "src/prisma/services/prisma.service";

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

  async deleteById(id: number): Promise<void> {
    await this.prismaService.travel.delete({
      where: {
        id,
      },
    });
  }
}
