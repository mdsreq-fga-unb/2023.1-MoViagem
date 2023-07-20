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

  async addGuestToTravel(
    loggedInUserId: number,
    guestEmail: string,
    travelId: number
  ): Promise<void> {
    const user = await this.userRepository.findByEmail(guestEmail);

    if (!user) {
      throw new BadRequestException("Usuário não encontrado");
    }

    const travel = await this.travelRepository.findById(travelId);

    if (!travel) {
      throw new BadRequestException("Viagem não encontrada");
    }

    if (user.id === loggedInUserId) {
      throw new BadRequestException("Você não pode adicionar a si mesmo como convidado");
    }

    const doesUserIsGuest = await this.guestRepository.doesUserIsGuest(user.id, travel.id);

    if (doesUserIsGuest) {
      throw new BadRequestException("Esse usuário já é um convidado");
    }

    const loggedInIsGuest = await this.guestRepository.doesUserIsGuest(loggedInUserId, travel.id);

    if (loggedInIsGuest) {
      const loggedInCanEdit = await this.guestRepository.doesUserCanEdit(loggedInUserId, travel.id);

      if (!loggedInCanEdit) {
        throw new BadRequestException("Você não pode adicionar convidados");
      }
    }

    await this.guestRepository.addGuestToTravel(user.id, travel.id);
  }

  async toggleGuestEditing(
    loggedInUserId: number,
    guestId: number,
    travelId: number
  ): Promise<void> {
    const user = await this.userRepository.findById(guestId);

    if (!user) {
      throw new BadRequestException("Usuário não encontrado");
    }

    const travel = await this.travelRepository.findById(travelId);

    if (!travel) {
      throw new BadRequestException("Viagem não encontrada");
    }

    const doesUserIsGuest = await this.guestRepository.doesUserIsGuest(user.id, travel.id);

    if (!doesUserIsGuest) {
      throw new BadRequestException("Esse usuário não é um convidado");
    }

    const loggedInIsGuest = await this.guestRepository.doesUserIsGuest(loggedInUserId, travel.id);

    if (loggedInIsGuest) {
      const loggedInCanEdit = await this.guestRepository.doesUserCanEdit(loggedInUserId, travel.id);

      if (!loggedInCanEdit) {
        throw new BadRequestException("Você não pode editar permissões de convidados");
      }
    }

    await this.guestRepository.toggleGuestEditing(user.id, travel.id);
  }

  async delete(userId: number, travelId: number): Promise<void> {
    return this.guestRepository.removeGuestFromTravel(userId, travelId);
  }
}
