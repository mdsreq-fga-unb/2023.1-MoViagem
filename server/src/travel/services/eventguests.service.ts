import { Injectable } from "@nestjs/common";
import { CreateEventGuestsRequestDTO } from "../dto/eventguests.dto";
import { EventGuestsRepository } from "../repositories/eventguests.repository";

@Injectable()
export class EventGuestsService {
  constructor(private eventGuestsRepository: EventGuestsRepository) {}

  async create(id: number, dto: CreateEventGuestsRequestDTO): Promise<void> {
    await this.eventGuestsRepository.create({
      // criar a partir do relacionamento - relacionar o convidado com aquele evento
      // event: {
      //   connect: {
      //     id,
      //   },
      // },
      // guests: {
      //   connect: {
      //     id,
      //   },
      // },
      // id,
      eventId: dto.eventId,
      idGuest: dto.idGuest,
    });
  }

  async delete(id: number): Promise<void> {
    return this.eventGuestsRepository.deleteById(id);
  }
}
