import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport/dist";
import { PrismaModule } from "../prisma/prisma.module";
import { EnvironmentModule } from "../environment/environment.module";
import { EnvironmentService } from "../environment/services/environment.service";
import { AuthController } from "./controllers/auth.controller";
import { AuthService } from "./services/auth.service";
import { UserService } from "./services/user.service";
import { JwtStrategy } from "./strategies/jwt.strategy";
import { LocalStrategy } from "./strategies/local.strategy";

@Module({
  imports: [
    PrismaModule,
    JwtModule.registerAsync({
      imports: [EnvironmentModule],
      inject: [EnvironmentService],
      useFactory: (env: EnvironmentService) => ({
        secret: env.jwtSecret,
        signOptions: {
          expiresIn: env.jwtExpiresInSeconds,
        },
      }),
    }),
    PassportModule,
    EnvironmentModule,
  ],
  providers: [UserService, AuthService, LocalStrategy, JwtStrategy],
  controllers: [AuthController],
  exports: [],
})
export class AuthModule {}
