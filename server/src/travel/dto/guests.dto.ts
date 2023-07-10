import { Guests } from "@prisma/client";
import { IsPositive } from "class-validator";

export class CreateGuestsRequestDTO {
  @IsPositive()
  userId: number;

  @IsPositive()
  travelId: number;
}

export class GuestsResponseDTO {
  id: number;
  userId: number;
  travelId: number;

  constructor(guests: Guests) {
    this.id = guests.id;
    this.userId = guests.userId;
    this.travelId = guests.travelId;
  }
}
