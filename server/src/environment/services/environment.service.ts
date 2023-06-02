import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import ms from "ms";

@Injectable()
export class EnvironmentService {
  constructor(private config: ConfigService) {}

  get nodeEnv(): string {
    return this.config.get("NODE_ENV", "development");
  }

  get port(): number {
    return this.config.get("PORT", 8000);
  }

  get jwtSecret(): string {
    return this.config.get("JWT_SECRET", "secret");
  }

  get jwtExpiresInSeconds(): number {
    const env = this.config.get("JWT_EXPIRES_IN", "15m");
    return this.parseStringToSeconds(env);
  }

  get jwtRefreshExpiresInSeconds(): number {
    const env = this.config.get("JWT_REFRESH_EXPIRES_IN", "30d");
    return this.parseStringToSeconds(env);
  }

  get isDevelopment(): boolean {
    return this.nodeEnv === "development";
  }

  get isProduction(): boolean {
    return this.nodeEnv === "production";
  }

  get corsOrigin(): string {
    return this.config.get("CORS_ORIGIN", "http://localhost:3000");
  }

  private parseStringToSeconds(env: string): number {
    return ms(env) / 1000;
  }
}
