import request from "../api-instance";
import { EditPasswordRequestDTO, EditUserRequestDTO } from "../dto/user-dtos";

export function requestEditUser(body: EditUserRequestDTO) {
  return request<EditUserRequestDTO, void>({
    method: "PUT",
    url: "user",
    body,
  });
}

export function requestEditPassword(body: EditPasswordRequestDTO) {
  return request<EditPasswordRequestDTO, void>({
    method: "PATCH",
    url: "user/update-password",
    body,
  });
}

export function requestDeleteAccount() {
  return request<never, never>({
    method: "DELETE",
    url: "user",
  });
}
