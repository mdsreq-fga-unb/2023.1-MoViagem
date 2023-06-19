import { BadRequestException, Injectable } from "@nestjs/common";
import { CreateHostRequestDTO } from "../dto/host.dto";
import { HostRepository } from "../repositories/host.repository";
import { HostResponseDTO } from "./../dto/host.dto";

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

  async edit(id: number, dto: CreateHostRequestDTO): Promise<void> {
    await this.hostRepository.updateHost(id, {
      contact: dto.contact,
      endTime: dto.endTime,
      local: dto.local,
      price: dto.price,
      startTime: dto.startTime,
      type: dto.type,
    });
  }

  async getHost(id: number): Promise<HostResponseDTO> {
    const host = await this.hostRepository.getHost(id);
    if (host == null) {
      throw new BadRequestException("viagem nao existe");
    }
    return new HostResponseDTO(host);
  }
}
