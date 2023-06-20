import { Event } from "@prisma/client";
import { IsDate, IsPositive, Length } from "class-validator";

export class CreateEventRequestDTO {
  @Length(1, 50)
  transportType: string;

  @Length(1, 100)
  departureLocation: string;

  @IsDate()
  eventTime: Date;

  @IsPositive()
  eventValue: number;

  @Length(1)
  eventExtras: string;
}

export class EventResponseDTO {
  id: number;
  transportType: string;
  departureLocation: string;
  eventTime: Date;
  eventValue: number;
  eventExtras: string;

  constructor(event: Event) {
    this.id = event.id;
    this.transportType = event.transportType;
    this.departureLocation = event.departureLocation;
    this.eventTime = event.eventTime;
    this.eventValue = event.eventValue.toNumber();
    this.eventExtras = event.eventExtras;
  }
}
