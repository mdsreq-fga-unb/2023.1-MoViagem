import request from "../api-instance";
import {
  CreateHostRequestDTO,
  CreateTransportRequestDTO,
  CreateTravelRequestDTO,
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
    url: `transport/create/${id}`,
    body: form,
  });
}

export function getTransport(id: string) {
  return request<never, TransportResponseDTO>({
    method: "GET",
    url: `transport/get-transport/${id}`,
  });
}

export function editTransport(form: CreateTransportRequestDTO, id: number) {
  return request<CreateTransportRequestDTO, never>({
    method: "PUT",
    url: `transport/edit-transport/${id}`,
    body: form,
  });
}

export function editTravel(id: number, form: CreateTravelRequestDTO) {
  return request<CreateTravelRequestDTO, never>({
    method: "PUT",
    url: `travel/edit-travel/${id}`,
    body: form,
  });
}

export async function getTravel(id: string) {
  return request<never, TravelsResponseDTO>({
    method: "GET",
    url: `travel/get-travels/${id}`,
  });
}

export async function getTravels() {
  return request<never, TravelsResponseDTO[]>({
    method: "GET",
    url: "travel",
  });
}

export function requestCreateHost(id: number, form: CreateHostRequestDTO) {
  return request<CreateHostRequestDTO, never>({
    method: "POST",
    url: `host/create/${id}`,
    body: form,
  });
}

export async function getHost(id: string) {
  return request<never, CreateHostRequestDTO>({
    method: "GET",
    url: `host/get-host/${id}`,
  });
}

export async function editHost(form: CreateHostRequestDTO, id: number) {
  return request<CreateHostRequestDTO, never>({
    method: "PUT",
    url: `host/editHost/${id}`,
    body: form,
  });
}
