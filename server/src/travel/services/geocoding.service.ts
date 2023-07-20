import { HttpService } from "@nestjs/axios";
import { Injectable } from "@nestjs/common";
import { firstValueFrom } from "rxjs";
import { EnvironmentService } from "src/environment/services/environment.service";
import { GeocodingResponseDTO } from "../dto/geocoding.dto";

@Injectable()
export class GeocodingService {
  constructor(private httpService: HttpService, private env: EnvironmentService) {}

  async getCoordinates(address: string): Promise<GeocodingResponseDTO | null> {
    const response = await firstValueFrom(
      this.httpService.get<GeocodingResponseDTO[]>("http://api.openweathermap.org/geo/1.0/direct", {
        params: {
          q: address,
          limit: 1,
          appid: this.env.openWeatherMapAppId,
        },
      })
    );

    if (response.data.length === 0) {
      return null;
    }

    // Mapping the response to our DTO because we don't want to expose the API's response structure
    const { lat, lon } = response.data[0];
    return new GeocodingResponseDTO(lat, lon);
  }
}
