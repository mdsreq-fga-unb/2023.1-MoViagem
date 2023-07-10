import { Injectable } from "@nestjs/common";
import { CreateGuestsRequestDTO } from "../dto/guests.dto";
import { GuestsRepository } from "../repositories/guests.repository";

@Injectable()
export class GuestsService {
  constructor(private guestsRepository: GuestsRepository) {}

  async create(id: number, dto: CreateGuestsRequestDTO): Promise<void> {
    await this.guestsRepository.create({
      // criar a partir do relacionamento -
      // relaciona o id da usuario em questao
      // com aquela viagem
      // user: {
      //   connect: {
      //     id,
      //   },
      // },
      // travel: {
      //   connect: {
      //     id,
      //   },
      // },
      // id,
      userId: dto.userId,
      travelId: dto.travelId,
    });
  }

  async delete(id: number): Promise<void> {
    return this.guestsRepository.deleteById(id);
  }
}
