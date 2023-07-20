import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { PrismaService } from "src/prisma/services/prisma.service";

@Injectable()
export class WeatherForecastRepository {
  constructor(private prismaService: PrismaService) {}

  async upsert(
    id: number,
    update: Prisma.WeatherForecastUpdateInput,
    create: Prisma.WeatherForecastCreateInput
  ) {
    return this.prismaService.weatherForecast.upsert({
      where: {
        travelId: id,
      },
      create,
      update,
    });
  }

  async findAllByTravelIds(travelIds: number[]) {
    return this.prismaService.weatherForecast.findMany({
      where: {
        travelId: {
          in: travelIds,
        },
      },
      include: {
        travel: true,
      },
    });
  }

  async deleteByTravelId(travelId: number) {
    return this.prismaService.weatherForecast.deleteMany({
      where: {
        travelId,
      },
    });
  }
}
