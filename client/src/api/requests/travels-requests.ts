import request from "../api-instance";
import { StayInfoDTO, CreateTravelRequestDTO } from "../dto/travels-dto";

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

export function requestCreateStay (body: StayInfoDTO) {
  return request<StayInfoDTO, never>({
    method: "POST",
    url: `createStay`,
    body,
  });
}

export function requestEditStay (body: StayInfoDTO) {
  return request<StayInfoDTO, never>({
    method: "PUT",
    url: `editStay`,
    body,
  });
}