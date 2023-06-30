import { Module } from "@nestjs/common";
import { PrismaModule } from "src/prisma/prisma.module";
import { EventController } from "./controllers/event.controller";
import { HostController } from "./controllers/host.controller";
import { TransportController } from "./controllers/transport.controller";
import { TravelController } from "./controllers/travel.controller";
import { EventRepository } from "./repositories/event.repository";
import { HostRepository } from "./repositories/host.repository";
import { TransportRepository } from "./repositories/transport.repository";
import { TravelRepository } from "./repositories/travel.repository";
import { EventService } from "./services/event.service";
import { HostService } from "./services/host.service";
import { TransportService } from "./services/transport.service";
import { TravelService } from "./services/travel.service";

@Module({
  imports: [PrismaModule],
  controllers: [TravelController, EventController, HostController, TransportController],
  providers: [
    TravelService,
    TravelRepository,
    EventService,
    EventRepository,
    HostService,
    HostRepository,
    TransportService,
    TransportRepository,
  ],
})
export class TravelModule {}
