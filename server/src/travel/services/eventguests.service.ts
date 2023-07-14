import { BadRequestException, Injectable } from "@nestjs/common";
import { UserRepository } from "src/auth/repositories/user.repository";
import { EventRepository } from "../repositories/event.repository";
import { EventGuestsRepository } from "../repositories/eventguests.repository";

@Injectable()
export class EventGuestsService {
  constructor(
    private eventGuestsRepository: EventGuestsRepository,
    private eventRepository: EventRepository,
    private userRepository: UserRepository
  ) {}

  // async create(id: number, dto: CreateEventGuestsRequestDTO): Promise<void> {
  //   await this.eventGuestsRepository.create({
  //     // criar a partir do relacionamento - relacionar o convidado com aquele evento
  //     // event: {
  //     //   connect: {
  //     //     id,
  //     //   },
  //     // },
  //     // guests: {
  //     //   connect: {
  //     //     id,
  //     //   },
  //     // },
  //     // id,
  //     eventId: dto.eventId,
  //     idGuest: dto.idGuest,
  //   });
  // }

  async addGuestToEvent(userId: number, eventId: number): Promise<void> {
    const user = await this.userRepository.findById(userId);

    if (!user) {
      throw new BadRequestException("User not found");
    }

    const travel = await this.eventRepository.findById(eventId);

    if (!travel) {
      throw new BadRequestException("Travel not found");
    }

    await this.eventGuestsRepository.addGuestToEvent(user.id, travel.id);
  }

  async delete(userId: number, eventId: number): Promise<void> {
    return this.eventGuestsRepository.removeGuestFromEvent(userId, eventId);
  }
}
