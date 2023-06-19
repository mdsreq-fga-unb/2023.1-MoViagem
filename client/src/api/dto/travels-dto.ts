export interface CreateTravelRequestDTO {
  local: string;
  startDate: Date;
  endDate: Date;
  description: string;
  numParticipants: number;
}

export interface CreateTransportRequestDTO {
  type: string;

  startLocal: string;

  endLocal: string;

  startTime: string;

  endTime: string;

  price: number;

  contacts: string;
}
