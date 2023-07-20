import { Prisma } from "@prisma/client";

const guestInfo = Prisma.validator<Prisma.GuestsArgs>()({
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

export type GuestInfo = Prisma.GuestsGetPayload<typeof guestInfo>;

export class GuestResponseDTO {
  id: number;
  name: string;
  canEdit: boolean;

  constructor(guestInfo: GuestInfo) {
    this.id = guestInfo.user.id;
    this.name = guestInfo.user.name;
    this.canEdit = guestInfo.canEdit;
  }
}
