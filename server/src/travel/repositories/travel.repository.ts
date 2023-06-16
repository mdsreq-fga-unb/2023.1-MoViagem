import { Injectable } from "@nestjs/common";
import { Prisma, Travel } from "@prisma/client";
import { PrismaService } from "src/prisma/services/prisma.service";

@Injectable()
export class TravelRepository {
  constructor(private prismaService: PrismaService) {}

  async createTravel(data: Prisma.TravelCreateInput): Promise<Travel> {
    return await this.prismaService.travel.create({
      data,
    });
  }
}
