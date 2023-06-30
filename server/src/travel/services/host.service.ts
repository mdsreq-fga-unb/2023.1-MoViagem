import { BadRequestException, Injectable } from "@nestjs/common";
import { CreateHostRequestDTO } from "../dto/host.dto";
import { HostRepository } from "../repositories/host.repository";
import { HostResponseDTO } from "./../dto/host.dto";

@Injectable()
export class HostService {
  constructor(private hostRepository: HostRepository) {}

  async create(id: number, dto: CreateHostRequestDTO): Promise<void> {
    await this.hostRepository.create({
      travel: {
        connect: {
          id,
        },
      },
      type: dto.type,
      startTime: dto.startTime,
      endTime: dto.endTime,
      local: dto.local,
      price: dto.price,
      contact: dto.contact,
    });
  }

  async edit(id: number, dto: CreateHostRequestDTO): Promise<void> {
    await this.hostRepository.update(id, {
      contact: dto.contact,
      endTime: dto.endTime,
      local: dto.local,
      price: dto.price,
      startTime: dto.startTime,
      type: dto.type,
    });
  }

  async getHost(id: number): Promise<HostResponseDTO> {
    const host = await this.hostRepository.findById(id);

    if (host == null) {
      throw new BadRequestException("viagem nao existe");
    }

    return new HostResponseDTO(host);
  }
}
