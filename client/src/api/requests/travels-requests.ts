import request from "../api-instance";
import {
  CreateHostRequestDTO,
  CreateTravelRequestDTO,
  ListTravelsResponseDTO,
} from "../dto/travels-dto";

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

export function editTravel(form: CreateTravelRequestDTO) {
  return request<CreateTravelRequestDTO, never>({
    method: "PUT",
    url: `travel/edit-travel/${"1"}`,
    body: form,
  });
}

export function getTravels(id: string) {
  return request<never, ListTravelsResponseDTO>({
    method: "GET",
    url: `travel/get-travels/${id}`,
  });
}

export function requestCreateHost(form: CreateHostRequestDTO) {
  return request<CreateHostRequestDTO, never>({
    method: "POST",
    url: "host",
    body: form,
  });
}

// function requestCreateHost(arg0: { stayType: string; startDate: Date; endDate: Date; local: string; price: number; contact: string; }) {
//   throw new Error("Function not implemented.");
// }

// export function requestEditStay(body: StayInfoDTO) {
//   return request<StayInfoDTO, never>({
//     method: "PUT",
//     url: `editStay`,
//     body,
//   });
// }
