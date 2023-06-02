import { Module } from "@nestjs/common";
import { AuthModule } from "../auth/auth.module";
import { HelloController } from "./controllers/hello.controller";
import { HelloService } from "./services/hello.service";

@Module({
  imports: [AuthModule],
  controllers: [HelloController],
  providers: [HelloService],
})
export class HelloModule {}
