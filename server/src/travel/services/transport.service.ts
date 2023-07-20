import { BadRequestException, Injectable } from "@nestjs/common";
import { CreateTransportRequestDTO, TransportResponseDTO } from "../dto/transport.dto";
import { GuestRepository } from "../repositories/guest.repository";
import { TransportRepository } from "../repositories/transport.repository";

@Injectable()
export class TransportService {
  constructor(
    private transportRepository: TransportRepository,
    private guestRepository: GuestRepository
  ) {}

  async create(
    loggedInUserId: number,
    travelId: number,
    dto: CreateTransportRequestDTO
  ): Promise<void> {
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

    await this.transportRepository.create({
      travel: {
        connect: {
          id: travelId,
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

  async editTransport(
    loggedInUserId: number,
    travelId: number,
    dto: CreateTransportRequestDTO
  ): Promise<void> {
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

    await this.transportRepository.update(travelId, {
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
