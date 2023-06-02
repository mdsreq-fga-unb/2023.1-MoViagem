import { createMock } from "@golevelup/ts-jest";
import { Test } from "@nestjs/testing";
import { AuthModule } from "../src/auth/auth.module";
import { EnvironmentModule } from "../src/environment/environment.module";
import { HelloModule } from "../src/hello/hello.module";
import { PrismaService } from "../src/prisma/services/prisma.service";

export async function createIntegrationTestModule() {
  return await Test.createTestingModule({
    imports: [EnvironmentModule, AuthModule, HelloModule],
  })
    .overrideProvider(PrismaService)
    .useValue(createMock<PrismaService>())
    .compile();
}
