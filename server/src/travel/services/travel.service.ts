import { Injectable } from "@nestjs/common";
import { CreateTravelRequestDTO } from "../dto/travel.dto";
import { TravelRepository } from "../repositories/travel.repository";

@Injectable()
export class TravelService {
  constructor(private travelRepository: TravelRepository) {}

  async create(id: number, createTravelRequestDTO: CreateTravelRequestDTO): Promise<void> {
    await this.travelRepository.createTravel({
      user: {
        connect: {
          id: id,
        },
      },
      local: createTravelRequestDTO.local,
      startDate: createTravelRequestDTO.startDate,
      endDate: createTravelRequestDTO.endDate,
      description: createTravelRequestDTO.description,
      numParticipants: createTravelRequestDTO.numParticipants,
    });
  }
}
