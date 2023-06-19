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
export interface TravelsResponseDTO {
  id: number;
  local: string;
  startDate: string;
  endDate: string;
  description: string;
  numParticipants: number;
}
// export type ListTravelsResponseDTO = TravelsResponseDTO[];
export interface CreateHostRequestDTO {
  type: string;
  startTime: Date;
  endTime: Date;
  local: string;
  price: number;
  contact: string;
}

