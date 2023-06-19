import { Host } from "@prisma/client";
import { IsDate, IsPositive, Length } from "class-validator";

export class CreateHostRequestDTO {
  @Length(4, 100)
  type: string;

  @IsDate()
  startTime: Date;

  @IsDate()
  endTime: Date;

  @Length(4, 100)
  local: string;

  @IsPositive()
  price: number;

  @Length(4, 100)
  contact: string;
}

export class HostResponseDTO {
  id: number;
  type: string;
  startTime: Date;
  endTime: Date;
  local: string;
  price: number;
  contact: string;
  constructor(host: Host) {
    this.id = host.id;
    this.local = host.local;
    this.type = host.type;
    this.startTime = host.startTime;
    this.endTime = host.endTime;
    this.price = host.price.toNumber();
    this.contact = host.contact;
  }
}
