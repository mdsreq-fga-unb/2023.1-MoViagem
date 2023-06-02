import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

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
    const valueStr = env.substring(0, env.length - 1);

    const unit = env.substring(env.length - 1, env.length);
    const value = parseInt(valueStr, 10);

    switch (unit) {
      case "s":
        return value;
      case "m":
        return value * 60;
      case "h":
        return value * 60 * 60;
      case "d":
        return value * 60 * 60 * 24;
      default:
        return value;
    }
  }
}
