import { Prisma } from "@prisma/client";

const eventGuestInfo = Prisma.validator<Prisma.EventGuestsArgs>()({
  select: {
    user: {
      select: {
        id: true,
        name: true,
      },
    },
  },
});

export type EventGuestInfo = Prisma.EventGuestsGetPayload<typeof eventGuestInfo>;
export class EventGuestResponseDTO {
  id: number;
  name: string;

  constructor(eventGuestInfo: EventGuestInfo) {
    this.id = eventGuestInfo.user.id;
    this.name = eventGuestInfo.user.name;
  }
}
