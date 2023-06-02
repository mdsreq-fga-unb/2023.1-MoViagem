import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PrismaService } from "src/prisma/services/prisma.service";

@Injectable()
export class HelloService {
  constructor(private readonly prismaService: PrismaService) {}

  async getHello(userId: number): Promise<string> {
    const user = await this.prismaService.user.findUnique({
      where: { id: userId },
      select: { name: true },
    });

    if (!user) {
      throw new UnauthorizedException();
    }

    return `Hello ${user.name}!`;
  }
}
