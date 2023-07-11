import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/services/prisma.service";
import { GuestInfo } from "../dto/guest.dto";

@Injectable()
export class GuestRepository {
  constructor(private prismaService: PrismaService) {}

  async findAllFromTravel(travelId: number): Promise<GuestInfo[]> {
    return await this.prismaService.guests.findMany({
      where: {
        travelId,
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

  async addGuestToTravel(userId: number, travelId: number): Promise<void> {
    await this.prismaService.guests.create({
      data: {
        userId,
        travelId,
      },
    });
  }
}
