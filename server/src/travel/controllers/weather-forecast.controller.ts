import { Controller, Get } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { EnableAuth } from "src/auth/decorators/auth.decorator";
import { User } from "src/auth/decorators/user.decorator";
import { UserInTokenDTO } from "src/auth/dto/user.dto";
import { WeatherForecastResponseDTO } from "../dto/weather-forecast.dto";
import { WeatherForecastService } from "../services/weather-forecast.service";

@Controller("/api/weather-forecast")
@ApiTags("Weather Forecast")
@EnableAuth()
export class WeatherForecastController {
  constructor(private weatherForecastService: WeatherForecastService) {}

  @Get()
  async listAllByUser(@User() user: UserInTokenDTO): Promise<WeatherForecastResponseDTO[]> {
    return this.weatherForecastService.getForecastOfUserTravels(user.id);
  }
}
