import { Injectable, UnauthorizedException } from "@nestjs/common";
import { UserRepository } from "../../auth/repositories/user.repository";

@Injectable()
export class HelloService {
  constructor(private userRepository: UserRepository) {}

  async getHello(userId: number): Promise<string> {
    const user = await this.userRepository.findUserById(userId);

    if (!user) {
      throw new UnauthorizedException();
    }

    return `Hello ${user.name}!`;
  }
}
