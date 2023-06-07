import request from "../api-instance";

export function getHello() {
  return request<never, string>({
    method: "GET",
    url: "hello",
  });
}
