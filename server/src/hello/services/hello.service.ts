import { Injectable } from "@nestjs/common";
import { UserInfoDTO } from "src/auth/dto/token.dto";

@Injectable()
export class HelloService {
  async getHello(user: UserInfoDTO): Promise<string> {
    return `Hello ${user.name}!`;
  }
}
