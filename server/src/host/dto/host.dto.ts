import { Decimal } from "@prisma/client/runtime";
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
  price: Decimal;

  @Length(4, 100)
  contact: string;
}
