import { Module } from "@nestjs/common";
import { PrismaModule } from "src/prisma/prisma.module";
import { TravelController } from "./controllers/travel.controller";
import { TravelRepository } from "./repositories/travel.repository";
import { TravelService } from "./services/travel.service";

@Module({
  imports: [PrismaModule],
  controllers: [TravelController],
  providers: [TravelService, TravelRepository],
})
export class TravelModule {}
