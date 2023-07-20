import { HttpModule } from "@nestjs/axios";
import { Module } from "@nestjs/common";
import { AuthModule } from "src/auth/auth.module";
import { EnvironmentModule } from "src/environment/environment.module";
import { PrismaModule } from "src/prisma/prisma.module";
import { EventController } from "./controllers/event.controller";
import { EventGuestsController } from "./controllers/eventguests.controller";
import { GuestController } from "./controllers/guest.controller";
import { HostController } from "./controllers/host.controller";
import { TransportController } from "./controllers/transport.controller";
import { TravelController } from "./controllers/travel.controller";
import { WeatherForecastController } from "./controllers/weather-forecast.controller";
import { EventRepository } from "./repositories/event.repository";
import { EventGuestsRepository } from "./repositories/eventguests.repository";
import { GuestRepository } from "./repositories/guest.repository";
import { HostRepository } from "./repositories/host.repository";
import { TransportRepository } from "./repositories/transport.repository";
import { TravelRepository } from "./repositories/travel.repository";
import { WeatherForecastRepository } from "./repositories/weather-forecast.repository";
import { EventService } from "./services/event.service";
import { EventGuestsService } from "./services/eventguests.service";
import { GeocodingService } from "./services/geocoding.service";
import { GuestService } from "./services/guest.service";
import { HostService } from "./services/host.service";
import { TransportService } from "./services/transport.service";
import { TravelService } from "./services/travel.service";
import { WeatherForecastService } from "./services/weather-forecast.service";

@Module({
  imports: [PrismaModule, EnvironmentModule, HttpModule, AuthModule],
  controllers: [
    TravelController,
    EventController,
    HostController,
    TransportController,
    GuestController,
    EventGuestsController,
    WeatherForecastController,
  ],
  providers: [
    TravelService,
    TravelRepository,
    EventService,
    EventRepository,
    HostService,
    HostRepository,
    TransportService,
    TransportRepository,
    GuestService,
    GuestRepository,
    EventGuestsService,
    EventGuestsRepository,
    GeocodingService,
    WeatherForecastService,
    WeatherForecastRepository,
  ],
})
export class TravelModule {}
