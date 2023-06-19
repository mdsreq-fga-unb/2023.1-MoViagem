import { Injectable } from "@nestjs/common";
import { CreateTransportRequestDTO } from "../dto/transport.dto";
import { TransportRepository } from "../repositories/transport.repository";

@Injectable()
export class TransportService {
  constructor(private transportRepository: TransportRepository) {}

  async create(id: number, createTransportRequestDTO: CreateTransportRequestDTO): Promise<void> {
    await this.transportRepository.createTransport({
      travel: {
        connect: {
          id: id,
        },
      },

      type: createTransportRequestDTO.type,
      startLocal: createTransportRequestDTO.startLocal,
      endLocal: createTransportRequestDTO.endLocal,
      startTime: createTransportRequestDTO.startTime,
      endTime: createTransportRequestDTO.endTime,
      price: createTransportRequestDTO.price,
      contacts: createTransportRequestDTO.contacts,
    });
  }
}
