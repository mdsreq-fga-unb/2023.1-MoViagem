import { Prisma, Travel } from "@prisma/client";
import { IsDate, IsInt, IsPositive, Length } from "class-validator";
import { HostResponseDTO } from "./host.dto";
import { TransportResponseDTO } from "./transport.dto";

const travelWithInfo = Prisma.validator<Prisma.TravelArgs>()({
  include: {
    host: true,
    transport: true,
  },
});

export type TravelWithInfo = Prisma.TravelGetPayload<typeof travelWithInfo>;

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

export class TravelsWithInfoResponseDTO extends TravelsResponseDTO {
  host: HostResponseDTO | null;
  transport: TransportResponseDTO | null;

  constructor(
    travel: Travel & { host: HostResponseDTO | null; transport: TransportResponseDTO | null }
  ) {
    super(travel);
    this.host = travel.host;
    this.transport = travel.transport;
  }
}
