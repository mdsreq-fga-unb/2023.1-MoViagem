import request from "../api-instance";
import { WeatherForecastResponseDTO } from "../dto/notification.dto";

export function requestGetNotifications() {
  return request<never, WeatherForecastResponseDTO[]>({
    method: "GET",
    url: "weather-forecast",
  });
}
