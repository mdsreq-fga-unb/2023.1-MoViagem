import { Transport } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime";
import { IsPositive, Length } from "class-validator";

export class CreateTransportRequestDTO {
  @Length(4, 100)
  type: string;

  @Length(4, 100)
  startLocal: string;

  @Length(4, 100)
  endLocal: string;

  @Length(4, 100)
  startTime: string;

  @Length(4, 100)
  endTime: string;

  @IsPositive()
  price: Decimal;

  @Length(4, 100)
  contacts: string;
}

export class TransportResponseDTO {
  id: number;
  type: string;
  startLocal: string;
  endLocal: string;
  startTime: string;
  endTime: string;
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
