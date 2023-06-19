export interface CreateTravelRequestDTO {
  local: string;
  startDate: Date;
  endDate: Date;
  description: string;
  numParticipants: number;
}

export interface TravelsResponseDTO {
  id: number;
  local: string;
  startDate: Date;
  endDate: Date;
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
