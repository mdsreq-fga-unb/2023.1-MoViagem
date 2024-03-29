import { plainToInstance } from "class-transformer";
import {
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  Length,
  Matches,
  validateSync,
} from "class-validator";

enum Environment {
  Development = "development",
  Production = "production",
  Test = "test",
}

class EnvironmentVariables {
  @IsOptional()
  @IsEnum(Environment)
  NODE_ENV?: Environment;

  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 0 })
  PORT?: number;

  @Length(32)
  JWT_SECRET: string;

  @IsOptional()
  @Matches(/^(?:\d+(?:[dhms])?)+$/)
  JWT_EXPIRES_IN?: string;

  @IsOptional()
  @Matches(/^(?:\d+(?:[dhms])?)+$/)
  JWT_REFRESH_EXPIRES_IN?: string;

  @IsOptional()
  @Matches(/^(?:https?:\/\/)(?:.*)$/)
  CORS_ORIGIN?: string;

  @IsString()
  OPEN_WEATHER_MAP_APP_ID: string;
}

export function validate(config: Record<string, unknown>) {
  const validatedConfig = plainToInstance(EnvironmentVariables, config, {
    enableImplicitConversion: true,
  });

  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }

  return validatedConfig;
}
