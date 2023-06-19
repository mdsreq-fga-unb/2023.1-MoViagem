import { Module } from "@nestjs/common";
import { APP_GUARD } from "@nestjs/core";
import { ThrottlerGuard, ThrottlerModule } from "@nestjs/throttler";
import { AuthModule } from "./auth/auth.module";
import { EnvironmentModule } from "./environment/environment.module";
import { HelloModule } from "./hello/hello.module";
import { HostModule } from "./host/host.module";
import { TravelModule } from "./travel/travel.module";

@Module({
  imports: [
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 100,
    }),
    EnvironmentModule,
    AuthModule,
    HelloModule,
    TravelModule,
    HostModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
