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
      startTime: createEventRequestDTO.startTime,
      endTime: createEventRequestDTO.endTime,
      description: createEventRequestDTO.description,
    });
  }

  async edit(id: number, dto: CreateEventRequestDTO): Promise<void> {
    await this.eventRepository.updateEvent(id, {
      endTime: dto.endTime,
      startTime: dto.startTime,
      description: dto.description,
    });
  }

  async getEvent(id: number): Promise<EventResponseDTO> {
    const event = await this.eventRepository.getEvent(id);
    if (event == null) {
      throw new BadRequestException("viagem nao existe");
    }
    return new EventResponseDTO(event);
  }
}
