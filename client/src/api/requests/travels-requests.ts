import request from "../api-instance";
import {
  CreateEventRequestDTO,
  CreateHostRequestDTO,
  CreateTransportRequestDTO,
  CreateTravelRequestDTO,
  EventResponseDTO,
  HostResponseDTO,
  TransportResponseDTO,
  TravelsResponseDTO,
} from "../dto/travels-dto";

export function requestCreateTravel(form: CreateTravelRequestDTO) {
  return request<CreateTravelRequestDTO, never>({
    method: "POST",
    url: "travel",
    body: form,
  });
}

export function requestCreateTransport(id: number, form: CreateTransportRequestDTO) {
  return request<CreateTransportRequestDTO, never>({
    method: "POST",
    url: `transport/${id}`,
    body: form,
  });
}

export function requestGetTransport(id: string) {
  return request<never, TransportResponseDTO>({
    method: "GET",
    url: `transport/${id}`,
  });
}

export function requestEditTransport(form: CreateTransportRequestDTO, id: number) {
  return request<CreateTransportRequestDTO, never>({
    method: "PUT",
    url: `transport/${id}`,
    body: form,
  });
}

export async function requestDeleteTravel(id: number) {
  return request<never, TravelsResponseDTO[]>({
    method: "DELETE",
    url: `travel/${id}`,
  });
}

export function requestEditTravel(id: number, form: CreateTravelRequestDTO) {
  return request<CreateTravelRequestDTO, never>({
    method: "PUT",
    url: `travel/${id}`,
    body: form,
  });
}

export async function requestGetTravel(id: string) {
  return request<never, TravelsResponseDTO>({
    method: "GET",
    url: `travel/${id}`,
  });
}

export async function requestGetTravels() {
  return request<never, TravelsResponseDTO[]>({
    method: "GET",
    url: "travel",
  });
}

export function requestCreateHost(id: number, form: CreateHostRequestDTO) {
  return request<CreateHostRequestDTO, never>({
    method: "POST",
    url: `host/${id}`,
    body: form,
  });
}

export async function requestGetHost(id: string) {
  return request<never, HostResponseDTO>({
    method: "GET",
    url: `host/${id}`,
  });
}

export async function requestEditHost(form: CreateHostRequestDTO, id: number) {
  return request<CreateHostRequestDTO, never>({
    method: "PUT",
    url: `host/${id}`,
    body: form,
  });
}

export function requestCreateEvent(id: number, form: CreateEventRequestDTO) {
  return request<CreateEventRequestDTO, never>({
    method: "POST",
    url: `event/${id}`,
    body: form,
  });
}

export async function requestGetEvent(id: string) {
  return request<never, EventResponseDTO>({
    method: "GET",
    url: `event/${id}`,
  });
}

export async function requestGetEvents(travelId: string) {
  return request<never, EventResponseDTO[]>({
    method: "GET",
    url: `event/${travelId}`,
  });
}

export async function requestEditEvent(form: CreateEventRequestDTO, id: number) {
  return request<CreateEventRequestDTO, never>({
    method: "PUT",
    url: `event/${id}`,
    body: form,
  });
}

export function requestDeleteEvent(id: string) {
  return request<never, never>({
    method: "DELETE",
    url: `event/${id}`,
  });
}
