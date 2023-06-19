import { Injectable } from "@nestjs/common";
import { Prisma, Transport } from "@prisma/client";
import { PrismaService } from "src/prisma/services/prisma.service";

@Injectable()
export class TransportRepository {
  constructor(private prismaService: PrismaService) {}

  async createTransport(data: Prisma.TransportCreateInput): Promise<Transport> {
    return await this.prismaService.transport.create({
      data,
    });
  }
}
