import { Module } from "@nestjs/common";
import { PrismaModule } from "src/prisma/prisma.module";
import { TransportController } from './controllers/transport.controller';
import { TransportRepository } from './repositories/transport.repository';
import { TransportService } from './services/transport.service';

@Module({
  imports: [PrismaModule],
  controllers: [TransportController],
  providers: [TransportService, TransportRepository],
})
export class HostModule {}
