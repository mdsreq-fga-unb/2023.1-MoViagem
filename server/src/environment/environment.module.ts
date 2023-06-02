import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { EnvironmentService } from "./services/environment.service";
import { validate } from "./validators/variables.validator";

@Module({
  imports: [
    ConfigModule.forRoot({
      validate,
    }),
  ],
  providers: [EnvironmentService],
  exports: [EnvironmentService],
})
export class EnvironmentModule {}
