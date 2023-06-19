import { Injectable } from "@nestjs/common";
import { Prisma, Travel } from "@prisma/client";
import { PrismaService } from "src/prisma/services/prisma.service";
import { CreateTravelRequestDTO } from '../dto/travel.dto';

@Injectable()
export class TravelRepository {
  constructor(private prismaService: PrismaService) {}

  async createTravel(data: Prisma.TravelCreateInput): Promise<Travel> {
    return await this.prismaService.travel.create({
      data,
    });
  }

  async getTravel(userId: string): Promise<Travel | null> {
    const travels = await this.prismaService.travel.findUnique({
      where: {
         
       id: parseInt(userId),
        
      },
    });
    return travels;
  }

  async editTravel(data: CreateTravelRequestDTO, id: string) {
    return this.prismaService.travel.update({
      data: {
        description: data.description,
        endDate: data.endDate,
        local: data.local,
        startDate: data.startDate,
        numParticipants: data.numParticipants
      },
      where: {
        id: parseInt(id)
      }
    })
  }
}
