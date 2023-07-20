import { Prisma, WeatherType } from "@prisma/client";

export class APIWeatherForecast {
  daily: Daily[];
  alerts?: Alert[];
}

export class Alert {
  start: number;
  end: number;
  description: string;
}

export class Daily {
  dt: number;
  temp: Temp;
  humidity: number;
  wind_speed: number;
  weather: Weather[];
  pop: number;
}

export class Temp {
  min: number;
  max: number;
}

export class Weather {
  main: "Thunderstorm" | "Drizzle" | "Rain" | "Snow" | "Atmosphere" | "Clear" | "Clouds";
  description: string;
  icon: string;
}

export class WeatherForecastDTO {
  date: Date;
  daily: Daily;
  alert?: Alert;
}

const weatherForecastWithTravelInfo = Prisma.validator<Prisma.WeatherForecastArgs>()({
  include: {
    travel: true,
  },
});

export type WeatherForecastWithTravel = Prisma.WeatherForecastGetPayload<
  typeof weatherForecastWithTravelInfo
>;

export class WeatherForecastResponseDTO {
  travelId: number;
  local: string;
  date: Date;
  minTemp: number;
  maxTemp: number;
  humidity: number;
  windSpeed: number;
  rainProb: number;
  weatherType: WeatherType;
  weatherDesc: string;
  weatherIcon: string;
  alert: string | null;

  constructor(data: WeatherForecastWithTravel) {
    this.travelId = data.travelId;
    this.local = data.travel.local;
    this.date = data.date;
    this.minTemp = data.minTemp;
    this.maxTemp = data.maxTemp;
    this.humidity = data.humidity;
    this.windSpeed = data.windSpeed;
    this.rainProb = data.rainProb;
    this.weatherType = data.weatherType;
    this.weatherDesc = data.weatherDesc;
    this.weatherIcon = data.weatherIcon;
    this.alert = data.alert;
  }
}
