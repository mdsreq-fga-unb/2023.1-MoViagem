import { BadRequestException, Injectable } from "@nestjs/common";
import { CreateTransportRequestDTO, TransportResponseDTO } from "../dto/transport.dto";
import { TransportRepository } from "../repositories/transport.repository";

@Injectable()
export class TransportService {
  constructor(private transportRepository: TransportRepository) {}

  async create(id: number, dto: CreateTransportRequestDTO): Promise<void> {
    await this.transportRepository.create({
      travel: {
        connect: {
          id,
        },
      },
      type: dto.type,
      startLocal: dto.startLocal,
      endLocal: dto.endLocal,
      startTime: dto.startTime,
      endTime: dto.endTime,
      price: dto.price,
      contacts: dto.contacts,
    });
  }

  async getTransport(id: number): Promise<TransportResponseDTO> {
    const transport = await this.transportRepository.findById(id);

    if (transport === null) {
      throw new BadRequestException("Transporte não existe");
    }

    return new TransportResponseDTO(transport);
  }

  async editTransport(id: number, dto: CreateTransportRequestDTO): Promise<void> {
    await this.transportRepository.update(id, {
      contacts: dto.contacts,
      endLocal: dto.endLocal,
      endTime: dto.endTime,
      price: dto.price,
      startLocal: dto.startLocal,
      startTime: dto.startTime,
      type: dto.type,
    });
  }
}
