import { BadRequestException, Injectable } from "@nestjs/common";
import { UserRepository } from "src/auth/repositories/user.repository";
import { EventGuestResponseDTO } from "../dto/eventguests.dto";
import { GuestResponseDTO } from "../dto/guest.dto";
import { EventRepository } from "../repositories/event.repository";
import { EventGuestsRepository } from "../repositories/eventguests.repository";

@Injectable()
export class EventGuestsService {
  constructor(
    private eventGuestsRepository: EventGuestsRepository,
    private eventRepository: EventRepository,
    private userRepository: UserRepository,
  ) {}

  async findAllGuestsFromEvent(eventId: number): Promise<EventGuestResponseDTO[]> {
    const guest = await this.eventGuestsRepository.findAllFromEvent(eventId);
    return guest.map((guest) => new GuestResponseDTO(guest));
  }

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
