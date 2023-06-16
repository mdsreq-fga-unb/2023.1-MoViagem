import { Controller, Get } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { UserInfoDTO } from "src/auth/dto/token.dto";
import { EnableAuth } from "../../auth/decorators/auth.decorator";
import { User } from "../../auth/decorators/user.decorator";
import { HelloService } from "../services/hello.service";

@Controller("/api/hello")
@ApiTags("hello")
// Precisa estar logado para acessar qualquer rota desse controller
@EnableAuth()
export class HelloController {
  constructor(private helloService: HelloService) {}

  @Get()
  async sayHello(@User() loggedInUser: UserInfoDTO): Promise<string> {
    return this.helloService.getHello(loggedInUser);
  }
}
