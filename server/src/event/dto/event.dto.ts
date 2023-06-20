import { Event } from "@prisma/client";
import { IsDate, Length } from "class-validator";

export class CreateEventRequestDTO {
  @IsDate()
  startTime: Date;

  @IsDate()
  endTime: Date;

  @Length(4, 500)
  description: string;
}

export class EventResponseDTO {
  id: number;
  startTime: Date;
  endTime: Date;
  description: string;

  constructor(event: Event) {
    this.id = event.id;
    this.startTime = event.startTime;
    this.endTime = event.endTime;
    this.description = event.description;
  }
}
