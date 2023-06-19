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

  async updateHost(id: number, data: Prisma.HostUpdateInput): Promise<Host> {
    return await this.prismaService.host.update({
      where: {
        id,
      },
      data,
    });
  }

  async getHost(id: number): Promise<Host | null> {
    const host = await this.prismaService.host.findUnique({
      where: {
        id: id,
      },
    });
    return host;
  }
}
