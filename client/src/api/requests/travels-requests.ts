import request from "../api-instance";
import { CreateTransportRequestDTO, CreateTravelRequestDTO } from "../dto/travels-dto";

export function getHello() {
  return request<never, string>({
    method: "GET",
    url: "hello",
  });
}

export function requestCreateTravel(form: CreateTravelRequestDTO) {
  return request<CreateTravelRequestDTO, never>({
    method: "POST",
    url: "travel",
    body: form,
  });
}

export function requestCreateTransport(form: CreateTransportRequestDTO) {
  return request<CreateTransportRequestDTO, never>({
    method: "POST",
    url: "transport",
    body: form,
  });
}
