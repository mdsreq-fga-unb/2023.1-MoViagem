import { Controller, Get } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { EnableAuth } from "src/auth/decorators/auth.decorator";
import { HelloService } from "../services/hello.service";
import { User } from "src/auth/decorators/user.decorator";
import { UserInRequest } from "src/auth/dto/user.dto";

@Controller("hello")
@ApiTags("hello")
@EnableAuth()
export class HelloController {
  constructor(private readonly helloService: HelloService) {}

  @Get()
  async sayHello(@User() loggedInUser: UserInRequest): Promise<string> {
    return this.helloService.getHello(loggedInUser.id);
  }
}
