import { BadRequestException, Injectable } from "@nestjs/common";
import { CreateTransportRequestDTO, TransportResponseDTO } from "../dto/transport.dto";
import { TransportRepository } from "../repositories/transport.repository";

@Injectable()
export class TransportService {
  constructor(private transportRepository: TransportRepository) {}

  async create(id: number, createTransportRequestDTO: CreateTransportRequestDTO): Promise<void> {
    "chamou o service"
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

  async getTransport(id: number): Promise<TransportResponseDTO> {
    const transport = await this.transportRepository.getTransport(id);
    if (transport === null) {
      throw new BadRequestException("Transporte não Existe");
    }
    return new TransportResponseDTO(transport);
  }

  async editTransport(id: number, dto: CreateTransportRequestDTO): Promise<void> {
    await this.transportRepository.updateTransport(id, {
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
