import { Controller, Get } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { EnableAuth } from "../../auth/decorators/auth.decorator";
import { User } from "../../auth/decorators/user.decorator";
import { UserInRequest } from "../../auth/dto/user.dto";
import { HelloService } from "../services/hello.service";

@Controller("/api/hello")
@ApiTags("hello")
@EnableAuth()
export class HelloController {
  constructor(private helloService: HelloService) {}

  @Get()
  async sayHello(@User() loggedInUser: UserInRequest): Promise<string> {
    return this.helloService.getHello(loggedInUser.id);
  }
}
