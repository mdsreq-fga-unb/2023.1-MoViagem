import { Injectable } from "@nestjs/common";
import { Prisma, Transport } from "@prisma/client";
import { PrismaService } from "src/prisma/services/prisma.service";

@Injectable()
export class TransportRepository {
  constructor(private prismaService: PrismaService) {}

  async create(data: Prisma.TransportCreateInput): Promise<Transport> {
    return await this.prismaService.transport.create({
      data,
    });
  }

  async findById(id: number): Promise<Transport | null> {
    return await this.prismaService.transport.findUnique({
      where: {
        id,
      },
    });
  }

  async update(id: number, data: Prisma.TransportUpdateInput): Promise<Transport> {
    return await this.prismaService.transport.update({
      where: {
        id,
      },
      data,
    });
  }
}
