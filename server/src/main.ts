import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import helmet from "helmet";
import { AppModule } from "./app.module";
import { EnvironmentService } from "./environment/services/environment.service";
import { PrismaExceptionFilter } from "./prisma/filters/prisma-exception.filter";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger:
      process.env.NODE_ENV === "production"
        ? ["error", "warn", "log"]
        : ["error", "warn", "log", "debug", "verbose"],
  });

  const env = app.get(EnvironmentService);

  app.use(helmet());
  app.enableCors({
    origin: env.corsOrigin,
  });
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      transformOptions: { enableImplicitConversion: true },
    })
  );
  app.useGlobalFilters(new PrismaExceptionFilter());

  if (env.isDevelopment) {
    const config = new DocumentBuilder()
      .setTitle("API MoViagem")
      .setVersion("1.0")
      .addBearerAuth()
      .build();

    const document = SwaggerModule.createDocument(app, config);

    SwaggerModule.setup("api/swagger", app, document);
  }

  await app.listen(env.port);
}
bootstrap();
