import request from "../api-instance";
import { CreateTravelRequestDTO } from "../dto/travels-dto";

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
