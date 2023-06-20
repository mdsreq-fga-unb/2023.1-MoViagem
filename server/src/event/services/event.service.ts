import { BadRequestException, Injectable } from "@nestjs/common";
import { CreateEventRequestDTO, EventResponseDTO } from "../dto/event.dto";
import { EventRepository } from "../repositories/event.repository";

@Injectable()
export class EventService {
  constructor(private eventRepository: EventRepository) {}

  async create(id: number, createEventRequestDTO: CreateEventRequestDTO): Promise<void> {
    await this.eventRepository.createEvent({
      travel: {
        connect: {
          id: id,
        },
      },
      departureLocation: createEventRequestDTO.departureLocation,
      eventTime: createEventRequestDTO.eventTime,
      eventExtras: createEventRequestDTO.eventExtras,
      eventValue: createEventRequestDTO.eventValue,
      transportType: createEventRequestDTO.transportType,
    });
  }

  async edit(id: number, dto: CreateEventRequestDTO): Promise<void> {
    await this.eventRepository.updateEvent(id, {
      departureLocation: dto.departureLocation,
      eventTime: dto.eventTime,
      eventExtras: dto.eventExtras,
      eventValue: dto.eventValue,
      transportType: dto.transportType,
    });
  }

  async getEvent(id: number): Promise<EventResponseDTO> {
    const event = await this.eventRepository.getEvent(id);

    if (event == null) {
      throw new BadRequestException("evento não existe");
    }

    return new EventResponseDTO(event);
  }
}
