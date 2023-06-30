import { Injectable } from "@nestjs/common";
import { Host, Prisma } from "@prisma/client";
import { PrismaService } from "src/prisma/services/prisma.service";

@Injectable()
export class HostRepository {
  constructor(private prismaService: PrismaService) {}

  async create(data: Prisma.HostCreateInput): Promise<Host> {
    return await this.prismaService.host.create({
      data,
    });
  }

  async update(id: number, data: Prisma.HostUpdateInput): Promise<Host> {
    return await this.prismaService.host.update({
      where: {
        id,
      },
      data,
    });
  }

  async findById(id: number): Promise<Host | null> {
    return await this.prismaService.host.findUnique({
      where: {
        id,
      },
    });
  }
}
