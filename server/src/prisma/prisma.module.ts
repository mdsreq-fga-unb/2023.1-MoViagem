import { Module } from "@nestjs/common";
import { EnvironmentModule } from "src/environment/environment.module";
import { PrismaService } from "./services/prisma.service";

@Module({
  imports: [EnvironmentModule],
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
