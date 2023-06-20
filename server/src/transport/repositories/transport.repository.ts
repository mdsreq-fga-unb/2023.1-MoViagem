import { Injectable } from "@nestjs/common";
import { Prisma, Transport } from "@prisma/client";
import { PrismaService } from "src/prisma/services/prisma.service";

@Injectable()
export class TransportRepository {
  constructor(private prismaService: PrismaService) {}

  async createTransport(data: Prisma.TransportCreateInput): Promise<Transport> {
    const transport = await this.prismaService.transport.create({
      data,
    });

    return transport;
  }

  async getTransport(id: number): Promise<Transport | null> {
    const transport = await this.prismaService.transport.findUnique({
      where: {
        id: id,
      },
    });
    return transport;
  }

  async updateTransport(id: number, data: Prisma.TransportUpdateInput): Promise<Transport> {
    return await this.prismaService.transport.update({
      where: {
        id: id,
      },
      data,
    });
  }
}
