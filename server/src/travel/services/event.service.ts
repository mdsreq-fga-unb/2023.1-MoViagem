import { BadRequestException, Injectable } from "@nestjs/common";
import { CreateEventRequestDTO, EventResponseDTO } from "../../travel/dto/event.dto";
import { EventRepository } from "../repositories/event.repository";

@Injectable()
export class EventService {
  constructor(private eventRepository: EventRepository) {}

  async create(id: number, dto: CreateEventRequestDTO): Promise<void> {
    if (dto.eventTime < new Date()) {
      throw new BadRequestException("data de evento não pode ser no passado");
    }

    await this.eventRepository.create({
      travel: {
        connect: {
          id,
        },
      },
      departureLocation: dto.departureLocation,
      eventTime: dto.eventTime,
      eventExtras: dto.eventExtras,
      eventValue: dto.eventValue,
      transportType: dto.transportType,
    });
  }

  async edit(id: number, dto: CreateEventRequestDTO): Promise<void> {
    await this.eventRepository.update(id, {
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
