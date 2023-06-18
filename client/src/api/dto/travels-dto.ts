export interface CreateTravelRequestDTO {
  local: string;
  startDate: Date;
  endDate: Date;
  description: string;
  numParticipants: number;
}

export interface StayInfoDTO {
  stayType: string;
  startDate: Date;
  endDate: Date;
  local: string;
  price: number;
  contact: string;
}