import { IsDate, IsInt, IsPositive, Length } from "class-validator";

export class CreateTravelRequestDTO {
  @Length(4, 100)
  local: string;

  @IsDate()
  startDate: Date;

  @IsDate()
  endDate: Date;

  @Length(4)
  description: string;

  @IsPositive()
  @IsInt()
  numParticipants: number;
}
