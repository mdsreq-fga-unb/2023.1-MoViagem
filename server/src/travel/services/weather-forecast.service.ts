import { HttpService } from "@nestjs/axios";
import { Injectable, Logger } from "@nestjs/common";
import { Cron, CronExpression } from "@nestjs/schedule";
import { add, compareAsc } from "date-fns";
import { firstValueFrom } from "rxjs";
import { EnvironmentService } from "src/environment/services/environment.service";
import { TravelRepository } from "src/travel/repositories/travel.repository";
import {
  APIWeatherForecast,
  WeatherForecastDTO,
  WeatherForecastResponseDTO,
} from "../dto/weather-forecast.dto";
import { WeatherForecastRepository } from "../repositories/weather-forecast.repository";

@Injectable()
export class WeatherForecastService {
  constructor(
    private httpService: HttpService,
    private travelRepository: TravelRepository,
    private weatherForecastRepository: WeatherForecastRepository,
    private env: EnvironmentService
  ) {}

  private normalizeDateTime(value: Date): Date {
    const date = new Date(value);
    date.setHours(0, 0, 0, 0);
    return date;
  }

  private async requestWeatherForecast(
    latitude: number,
    longitude: number
  ): Promise<APIWeatherForecast> {
    const response = await firstValueFrom(
      this.httpService.get<APIWeatherForecast>("https://api.openweathermap.org/data/3.0/onecall", {
        params: {
          lat: latitude,
          lon: longitude,
          exclude: "current,hourly,minutely",
          units: "metric",
          lang: "pt_br",
          appid: this.env.openWeatherMapAppId,
        },
      })
    );

    return response.data;
  }

  private async getForecastOfDay(
    day: Date,
    latitude: number,
    longitude: number
  ): Promise<WeatherForecastDTO | null> {
    const forecast = await this.requestWeatherForecast(latitude, longitude);
    const normalizedDay = this.normalizeDateTime(day);

    const firstDayForecast = forecast.daily.find((currentForecast) => {
      const normalizedCurrentDate = this.normalizeDateTime(new Date(currentForecast.dt * 1000));

      const comparation = compareAsc(normalizedCurrentDate, normalizedDay);
      return comparation >= 0 && comparation <= 1;
    });

    if (!firstDayForecast) {
      return null;
    }

    const firstAlertInsideForecast = forecast.alerts?.find((alert) => {
      const normalizedAlertStart = this.normalizeDateTime(new Date(alert.start * 1000));
      const normalizedAlertEnd = this.normalizeDateTime(new Date(alert.end * 1000));

      return normalizedAlertStart <= normalizedDay && normalizedDay <= normalizedAlertEnd;
    });

    return {
      date: normalizedDay,
      daily: firstDayForecast,
      alert: firstAlertInsideForecast,
    };
  }

  private async getWeatherForecastOfTravel(travelInfo: {
    travelBegin: Date;
    travelEnd: Date;
    latitude: number;
    longitude: number;
  }): Promise<WeatherForecastDTO | null> {
    // We can only get the weather forecast from the next 7 days,
    // so we will get the forecast of the first day of the travel if it happens in less than 7 days.
    // If the travel happens in more than 7 days, we won't get a forecast at all, but if the travel
    // is happening today, we will get the forecast of today, every day.
    const { travelBegin, latitude, longitude } = travelInfo;
    const normalizedTravelBegin = this.normalizeDateTime(travelBegin);
    const normalizedToday = this.normalizeDateTime(new Date());
    const forecastLimit = add(normalizedToday, { days: 7 });

    // If the first day of the travel is after the forecast limit, we won't get a forecast at all.
    if (normalizedTravelBegin > forecastLimit) {
      return null;
    }

    // If the first day of the travel is before today, then the travel is happening or happened in the past.
    if (normalizedTravelBegin < normalizedToday) {
      // if the end of the travel is before today, then the travel happened in the past.
      // then just return null
      if (travelInfo.travelEnd < normalizedToday) {
        return null;
      }

      // if the end of the travel is after today, then the travel is happening today.
      // then we will get the forecast of today.
      return this.getForecastOfDay(normalizedToday, latitude, longitude);
    }

    // If the first day of the travel is today or after, we will get the forecast of today.
    return this.getForecastOfDay(normalizedTravelBegin, latitude, longitude);
  }

  @Cron(CronExpression.EVERY_DAY_AT_3AM)
  async getForecastsOfAllTravels() {
    Logger.log("Getting weather forecasts of all travels...");

    const travels = await this.travelRepository.findAll();

    for (const travel of travels) {
      if (!travel.latitude || !travel.longitude) {
        await this.weatherForecastRepository.deleteByTravelId(travel.id);
        continue;
      }

      const forecast = await this.getWeatherForecastOfTravel({
        travelBegin: travel.startDate,
        travelEnd: travel.endDate,
        latitude: travel.latitude,
        longitude: travel.longitude,
      });

      if (!forecast) {
        await this.weatherForecastRepository.deleteByTravelId(travel.id);
        continue;
      }

      const data = {
        date: forecast.date,
        minTemp: forecast.daily.temp.min,
        maxTemp: forecast.daily.temp.max,
        humidity: forecast.daily.humidity,
        rainProb: forecast.daily.pop,
        weatherType: forecast.daily.weather[0].main,
        weatherDesc: forecast.daily.weather[0].description,
        weatherIcon: forecast.daily.weather[0].icon,
        windSpeed: forecast.daily.wind_speed,
        alert: forecast.alert !== undefined ? forecast.alert.description : null,
      };
      if (travel[data.weatherType]) {
        await this.weatherForecastRepository.upsert(travel.id, data, {
          ...data,
          travel: {
            connect: {
              id: travel.id,
            },
          },
        });
      } else {
        await this.weatherForecastRepository.deleteByTravelId(travel.id);
      }
    }
  }

  async getForecastOfUserTravels(userId: number): Promise<WeatherForecastResponseDTO[]> {
    const travelIds = await this.travelRepository.findAllIdsByUser(userId);
    const guestTravelIds = await this.travelRepository.findAllIdsBeingGuest(userId);
    const forecasts = await this.weatherForecastRepository.findAllByTravelIds([
      ...travelIds,
      ...guestTravelIds,
    ]);

    return forecasts.map((forecast) => new WeatherForecastResponseDTO(forecast));
  }
}
