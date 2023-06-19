import { Module } from "@nestjs/common";
import { PrismaModule } from "src/prisma/prisma.module";
import { HostController } from "./controllers/host.controller";
import { HostRepository } from "./repositories/host.repository";
import { HostService } from "./services/host.service";

@Module({
  imports: [PrismaModule],
  controllers: [HostController],
  providers: [HostService, HostRepository],
})
export class HostModule {}
