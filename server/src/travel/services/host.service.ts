import { BadRequestException, Injectable } from "@nestjs/common";
import { CreateHostRequestDTO } from "../dto/host.dto";
import { GuestRepository } from "../repositories/guest.repository";
import { HostRepository } from "../repositories/host.repository";
import { HostResponseDTO } from "./../dto/host.dto";

@Injectable()
export class HostService {
  constructor(private hostRepository: HostRepository, private guestRepository: GuestRepository) {}

  async create(loggedInUserId: number, travelId: number, dto: CreateHostRequestDTO): Promise<void> {
    if (dto.startTime > dto.endTime) {
      throw new BadRequestException("data de inicio não pode ser depois da data de fim");
    }

    const loggedInIsGuest = await this.guestRepository.doesUserIsGuest(loggedInUserId, travelId);

    if (loggedInIsGuest) {
      const doesGuestCanEdit = await this.guestRepository.doesUserCanEdit(loggedInUserId, travelId);

      if (!doesGuestCanEdit) {
        throw new BadRequestException("Você não pode editar essa viagem");
      }
    }

    await this.hostRepository.create({
      travel: {
        connect: {
          id: travelId,
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

  async edit(loggedInUserId: number, travelId: number, dto: CreateHostRequestDTO): Promise<void> {
    if (dto.startTime > dto.endTime) {
      throw new BadRequestException("data de inicio não pode ser depois da data de fim");
    }

    const loggedInIsGuest = await this.guestRepository.doesUserIsGuest(loggedInUserId, travelId);

    if (loggedInIsGuest) {
      const doesGuestCanEdit = await this.guestRepository.doesUserCanEdit(loggedInUserId, travelId);

      if (!doesGuestCanEdit) {
        throw new BadRequestException("Você não pode editar essa viagem");
      }
    }

    await this.hostRepository.update(travelId, {
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
      throw new BadRequestException("Estadias não encontradas.");
    }

    return new HostResponseDTO(host);
  }
}
