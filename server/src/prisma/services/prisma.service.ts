import { INestApplication, Injectable, Logger, OnModuleInit } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";
import { PrismaClientOptions } from "@prisma/client/runtime/library";
import { EnvironmentService } from "../../environment/services/environment.service";

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  private logger = new Logger(PrismaService.name);

  constructor(env: EnvironmentService) {
    const config: PrismaClientOptions = {
      log: ["error"],
      errorFormat: "minimal",
    };

    if (env.isDevelopment) {
      config.log = ["query", "info", "warn"];
      config.errorFormat = "pretty";
    }

    super(config);
  }

  async onModuleInit() {
    await this.$connect();
    this.logger.debug("Connected to database");
  }

  async enableShutdownHooks(app: INestApplication) {
    this.$on("beforeExit", async () => {
      await app.close();
    });
  }
}
