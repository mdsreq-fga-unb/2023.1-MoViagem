import { Injectable } from "@nestjs/common";
import { Host, Prisma } from "@prisma/client";
import { PrismaService } from "src/prisma/services/prisma.service";

@Injectable()
export class HostRepository {
  constructor(private prismaService: PrismaService) {}

  async createHost(data: Prisma.HostCreateInput): Promise<Host> {
    return await this.prismaService.host.create({
      data,
    });
  }
}
