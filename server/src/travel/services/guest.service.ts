import { BadRequestException, Injectable } from "@nestjs/common";
import { UserRepository } from "src/auth/repositories/user.repository";
import { GuestResponseDTO } from "../dto/guest.dto";
import { GuestRepository } from "../repositories/guest.repository";
import { TravelRepository } from "../repositories/travel.repository";

@Injectable()
export class GuestService {
  constructor(
    private guestRepository: GuestRepository,
    private travelRepository: TravelRepository,
    private userRepository: UserRepository
  ) {}

  async findAllGuestsFromTravel(travelId: number): Promise<GuestResponseDTO[]> {
    const guest = await this.guestRepository.findAllFromTravel(travelId);
    return guest.map((guest) => new GuestResponseDTO(guest));
  }

  async addGuestToTravel(guestEmail: string, travelId: number): Promise<void> {
    const user = await this.userRepository.findByEmail(guestEmail);

    if (!user) {
      throw new BadRequestException("User not found");
    }

    const travel = await this.travelRepository.findById(travelId);

    if (!travel) {
      throw new BadRequestException("Travel not found");
    }

    await this.guestRepository.addGuestToTravel(user.id, travel.id);
  }
}
