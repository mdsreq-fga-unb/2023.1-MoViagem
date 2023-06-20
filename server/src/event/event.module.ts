import { Module } from "@nestjs/common";
import { PrismaModule } from "src/prisma/prisma.module";
import { EventController } from "./controllers/event.controller";
import { EventRepository } from "./repositories/event.repository";
import { EventService } from "./services/event.service";

@Module({
  imports: [PrismaModule],
  controllers: [EventController],
  providers: [EventService, EventRepository],
})
export class EventModule {}
