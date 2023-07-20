// Request DTOs

export interface CreateTravelRequestDTO {
  local: string;
  startDate: Date;
  endDate: Date;
  description: string;
  numParticipants: number;
}

export interface UpdateTravelRequestDTO extends CreateTravelRequestDTO {
  Thunderstorm: boolean;
  Drizzle: boolean;
  Rain: boolean;
  Snow: boolean;
  Atmosphere: boolean;
  Clear: boolean;
  Clouds: boolean;
}

export interface CreateTransportRequestDTO {
  type: string;
  startLocal: string;
  endLocal: string;
  startTime: Date;
  endTime: Date;
  price: number;
  contacts: string;
}

export interface CreateHostRequestDTO {
  type: string;
  startTime: Date;
  endTime: Date;
  local: string;
  price: number;
  contact: string;
}

export interface CreateEventRequestDTO {
  transportType: string;
  departureLocation: string;
  eventTime: Date;
  eventValue: number;
  eventExtras: string;
}

// Response DTOs, remember that json received from server only converts to string and number
// conversion to Date is needed in the frontend

export interface EventResponseDTO {
  id: number;
  transportType: string;
  departureLocation: string;
  eventTime: string;
  eventValue: number;
  eventExtras: string;
}

export interface HostResponseDTO {
  id: number;
  type: string;
  startTime: string;
  endTime: string;
  local: string;
  price: number;
  contact: string;
}

export interface TravelsResponseDTO {
  id: number;
  local: string;
  startDate: string;
  endDate: string;
  description: string;
  numParticipants: number;
  Thunderstorm: boolean;
  Drizzle: boolean;
  Rain: boolean;
  Snow: boolean;
  Atmosphere: boolean;
  Clear: boolean;
  Clouds: boolean;
}

export interface TransportResponseDTO {
  id: number;
  type: string;
  startLocal: string;
  endLocal: string;
  startTime: string;
  endTime: string;
  price: number;
  contacts: string;
}

export interface TravelsWithInfoResponseDTO extends TravelsResponseDTO {
  host: HostResponseDTO | null;
  transport: TransportResponseDTO | null;
}

export interface GuestResponseDTO {
  id: number;
  name: string;
  canEdit: boolean;
}

export interface EventGuestResponseDTO {
  id: number;
  name: string;
}
