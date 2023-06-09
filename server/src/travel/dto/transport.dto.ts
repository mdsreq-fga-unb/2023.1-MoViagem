import { Transport } from "@prisma/client";
import { IsDate, IsPositive, Length } from "class-validator";

export class CreateTransportRequestDTO {
  @Length(4, 50)
  type: string;

  @Length(4, 100)
  startLocal: string;

  @Length(4, 100)
  endLocal: string;

  @IsDate()
  startTime: Date;

  @IsDate()
  endTime: Date;

  @IsPositive()
  price: number;

  @Length(4, 50)
  contacts: string;
}

export class TransportResponseDTO {
  id: number;
  type: string;
  startLocal: string;
  endLocal: string;
  startTime: Date;
  endTime: Date;
  price: number;
  contacts: string;

  constructor(transport: Transport) {
    this.id = transport.id;
    this.contacts = transport.contacts;
    this.endLocal = transport.endLocal;
    this.startLocal = transport.startLocal;
    this.endTime = transport.endTime;
    this.startTime = transport.startTime;
    this.type = transport.type;
    this.price = transport.price.toNumber();
  }
}
