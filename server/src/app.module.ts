import { Module } from "@nestjs/common";
import { APP_GUARD } from "@nestjs/core";
import { ThrottlerGuard, ThrottlerModule } from "@nestjs/throttler";
import { AuthModule } from "./auth/auth.module";
import { EnvironmentModule } from "./environment/environment.module";
import { EventModule } from "./event/event.module";
import { HostModule } from "./host/host.module";
import { TransportModule } from "./transport/transport.module";
import { TravelModule } from "./travel/travel.module";

@Module({
  imports: [
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 100,
    }),
    EnvironmentModule,
    AuthModule,
    TravelModule,
    HostModule,
    TransportModule,
    EventModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
