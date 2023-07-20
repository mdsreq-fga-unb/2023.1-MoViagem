import { BadRequestException, Injectable } from "@nestjs/common";
import { CreateEventRequestDTO, EventResponseDTO } from "../../travel/dto/event.dto";
import { EventRepository } from "../repositories/event.repository";
import { GuestRepository } from "../repositories/guest.repository";

@Injectable()
export class EventService {
  constructor(private eventRepository: EventRepository, private guestRepository: GuestRepository) {}

  async getEventsByTravel(travelId: number): Promise<EventResponseDTO[]> {
    const events = await this.eventRepository.findAllByTravel(travelId);

    return events.map((event) => new EventResponseDTO(event));
  }

  async create(
    loggedInUserId: number,
    travelId: number,
    dto: CreateEventRequestDTO
  ): Promise<void> {
    if (dto.eventTime < new Date()) {
      throw new BadRequestException("data de evento não pode ser no passado");
    }

    const loggedInIsGuest = await this.guestRepository.doesUserIsGuest(loggedInUserId, travelId);

    if (loggedInIsGuest) {
      const doesGuestCanEdit = await this.guestRepository.doesUserCanEdit(loggedInUserId, travelId);

      if (!doesGuestCanEdit) {
        throw new BadRequestException("Você não pode editar essa viagem");
      }
    }

    await this.eventRepository.create({
      travel: {
        connect: {
          id: travelId,
        },
      },
      departureLocation: dto.departureLocation,
      eventTime: dto.eventTime,
      eventExtras: dto.eventExtras,
      eventValue: dto.eventValue,
      transportType: dto.transportType,
    });
  }

  async delete(id: number): Promise<void> {
    return this.eventRepository.deleteById(id);
  }

  async edit(loggedInUserId: number, travelId: number, dto: CreateEventRequestDTO): Promise<void> {
    const loggedInIsGuest = await this.guestRepository.doesUserIsGuest(loggedInUserId, travelId);

    if (loggedInIsGuest) {
      const doesGuestCanEdit = await this.guestRepository.doesUserCanEdit(loggedInUserId, travelId);

      if (!doesGuestCanEdit) {
        throw new BadRequestException("Você não pode editar essa viagem");
      }
    }

    await this.eventRepository.update(travelId, {
      departureLocation: dto.departureLocation,
      eventTime: dto.eventTime,
      eventExtras: dto.eventExtras,
      eventValue: dto.eventValue,
      transportType: dto.transportType,
    });
  }

  async getEvent(id: number): Promise<EventResponseDTO> {
    const event = await this.eventRepository.findById(id);

    if (event == null) {
      throw new BadRequestException("evento não existe");
    }

    return new EventResponseDTO(event);
  }
}
