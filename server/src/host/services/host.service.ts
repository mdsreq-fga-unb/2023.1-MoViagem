import { Injectable } from "@nestjs/common";
import { CreateHostRequestDTO } from "../dto/host.dto";
import { HostRepository } from "../repositories/host.repository";

@Injectable()
export class HostService {
  constructor(private hostRepository: HostRepository) {}

  async create(id: number, createHostRequestDTO: CreateHostRequestDTO): Promise<void> {
    await this.hostRepository.createHost({
      travel: {
        connect: {
          id: id,
        },
      },
      type: createHostRequestDTO.type,
      startTime: createHostRequestDTO.startTime,
      endTime: createHostRequestDTO.endTime,
      local: createHostRequestDTO.local,
      price: createHostRequestDTO.price,
      contact: createHostRequestDTO.contact,
    });
  }
}
