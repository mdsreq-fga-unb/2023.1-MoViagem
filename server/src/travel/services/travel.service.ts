import { BadRequestException, Injectable } from "@nestjs/common";
import { CreateTravelRequestDTO, TravelsResponseDTO } from "../dto/travel.dto";
import { TravelRepository } from "./../repositories/travel.repository";

@Injectable()
export class TravelService {
  constructor(private travelRepository: TravelRepository) {}

  async getTravelsByUser(userId: number): Promise<TravelsResponseDTO[]> {
    const travels = await this.travelRepository.findAllByUser(userId);

    return travels.map((travel) => new TravelsResponseDTO(travel));
  }

  async create(id: number, dto: CreateTravelRequestDTO): Promise<void> {
    await this.travelRepository.create({
      user: {
        connect: {
          id,
        },
      },
      local: dto.local,
      startDate: dto.startDate,
      endDate: dto.endDate,
      description: dto.description,
      numParticipants: dto.numParticipants,
    });
  }

  async getTravels(id: number): Promise<TravelsResponseDTO> {
    const travel = await this.travelRepository.findById(id);

    if (travel == null) {
      throw new BadRequestException("viagem nao existe");
    }

    return new TravelsResponseDTO(travel);
  }

  async edit_Travel(id: number, dto: CreateTravelRequestDTO): Promise<void> {
    this.travelRepository.update(id, {
      local: dto.local,
      startDate: dto.startDate,
      endDate: dto.endDate,
      description: dto.description,
      numParticipants: dto.numParticipants,
    });
  }
}
