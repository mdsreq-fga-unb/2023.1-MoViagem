import { Travel } from "@prisma/client";
import { IsDate, IsInt, IsPositive, Length } from "class-validator";

export class CreateTravelRequestDTO {
  @Length(4, 100)
  local: string;

  @IsDate()
  startDate: Date;

  @IsDate()
  endDate: Date;

  @Length(4, 100)
  description: string;

  @IsPositive()
  @IsInt()
  numParticipants: number;
}

export class TravelsResponseDTO {
  id: number;
  local: string;
  startDate: Date;
  endDate: Date;
  numParticipants: number;
  description: string;

  constructor(travel: Travel) {
    this.id = travel.id;
    this.local = travel.local;
    this.startDate = travel.startDate;
    this.endDate = travel.endDate;
    this.description = travel.description;
    this.numParticipants = travel.numParticipants;
  }
}
