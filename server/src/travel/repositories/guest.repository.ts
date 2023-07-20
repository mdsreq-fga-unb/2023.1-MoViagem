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
        canEdit: true,
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

  async doesUserIsGuest(userId: number, travelId: number): Promise<boolean> {
    const guest = await this.prismaService.guests.findUnique({
      where: {
        userId_travelId: {
          userId,
          travelId,
        },
      },
    });

    return guest !== null;
  }

  async doesUserCanEdit(userId: number, travelId: number): Promise<boolean> {
    const guest = await this.prismaService.guests.findUnique({
      where: {
        userId_travelId: {
          userId,
          travelId,
        },
      },
      select: {
        canEdit: true,
      },
    });

    if (guest === null) {
      return false;
    }

    return guest.canEdit;
  }

  async toggleGuestEditing(userId: number, travelId: number): Promise<void> {
    await this.prismaService.$transaction(async (transaction) => {
      const guest = await transaction.guests.findUnique({
        where: {
          userId_travelId: {
            userId,
            travelId,
          },
        },
        select: {
          canEdit: true,
        },
      });

      if (guest === null) {
        return;
      }

      await transaction.guests.update({
        where: {
          userId_travelId: {
            userId,
            travelId,
          },
        },
        data: {
          canEdit: !guest.canEdit,
        },
      });
    });
  }
}
