export interface WeatherForecastResponseDTO {
  travelId: number;
  local: string;
  date: string;
  minTemp: number;
  maxTemp: number;
  humidity: number;
  windSpeed: number;
  rainProb: number;
  weatherType: "Thunderstorm" | "Drizzle" | "Rain" | "Snow" | "Atmosphere" | "Clear" | "Clouds";
  weatherDesc: string;
  weatherIcon: string;
  alert: string | null;
}
