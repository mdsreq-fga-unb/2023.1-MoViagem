import { Decimal } from "@prisma/client/runtime";
import { IsDate, IsPositive, Length } from "class-validator";

export class CreateTransportRequestDTO {
  @Length(4, 100)
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
  price: Decimal;

  @Length(4, 100)
  contacts: string;
}
