import { Prisma, Travel } from "@prisma/client";
import { IsBoolean, IsDate, IsInt, IsPositive, Length } from "class-validator";
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

export class UpdateTravelRequestDTO extends CreateTravelRequestDTO {
  @IsBoolean()
  Thunderstorm: boolean;

  @IsBoolean()
  Drizzle: boolean;

  @IsBoolean()
  Rain: boolean;

  @IsBoolean()
  Snow: boolean;

  @IsBoolean()
  Atmosphere: boolean;

  @IsBoolean()
  Clear: boolean;

  @IsBoolean()
  Clouds: boolean;
}

export class TravelsResponseDTO {
  id: number;
  local: string;
  startDate: Date;
  endDate: Date;
  numParticipants: number;
  description: string;
  Thunderstorm: boolean;
  Drizzle: boolean;
  Rain: boolean;
  Snow: boolean;
  Atmosphere: boolean;
  Clear: boolean;
  Clouds: boolean;

  constructor(travel: Travel) {
    this.id = travel.id;
    this.local = travel.local;
    this.startDate = travel.startDate;
    this.endDate = travel.endDate;
    this.description = travel.description;
    this.numParticipants = travel.numParticipants;
    this.Thunderstorm = travel.Thunderstorm;
    this.Drizzle = travel.Drizzle;
    this.Rain = travel.Rain;
    this.Snow = travel.Snow;
    this.Atmosphere = travel.Atmosphere;
    this.Clear = travel.Clear;
    this.Clouds = travel.Clouds;
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
