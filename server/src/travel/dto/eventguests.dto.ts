import { EventGuests } from "@prisma/client";
import { IsPositive } from "class-validator";

export class CreateEventGuestsRequestDTO {
  @IsPositive()
  eventId: number;

  @IsPositive()
  idGuest: number;
}

export class EventGuestsResponseDTO {
  id: number;
  eventId: number;
  idGuest: number;

  constructor(eventguests: EventGuests) {
    this.id = eventguests.id;
    this.eventId = eventguests.eventId;
    this.idGuest = eventguests.idGuest;
  }
}
