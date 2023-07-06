import { BadRequestException, Injectable } from "@nestjs/common";
import { CreateEventRequestDTO, EventResponseDTO } from "../../travel/dto/event.dto";
import { EventRepository } from "../repositories/event.repository";

@Injectable()
export class EventService {
  constructor(private eventRepository: EventRepository) { }
  
  async getEventsByTravel(travelId: number): Promise<EventResponseDTO[]> {
    const events = await this.eventRepository.findAllByTravel(travelId);

    return events.map((event) => new EventResponseDTO(event));
  }

  async create(id: number, dto: CreateEventRequestDTO): Promise<void> {
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

  async delete(id: number): Promise<void> {
    return this.eventRepository.deleteById(id);
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
