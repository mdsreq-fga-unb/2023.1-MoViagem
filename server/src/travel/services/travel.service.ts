import { BadRequestException, Injectable } from "@nestjs/common";
import { CreateTravelRequestDTO, TravelsResponseDTO } from "../dto/travel.dto";
import { TravelRepository } from "./../repositories/travel.repository";

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

  async getTravels(id: string): Promise<TravelsResponseDTO> {
    const travel = await this.travelRepository.getTravel(id);
    if (travel == null) {
      throw new BadRequestException("viagem nao existe");
    }
    return new TravelsResponseDTO(travel);
  }

  async edit_Travel(data: CreateTravelRequestDTO, id: string): Promise<void> {
    this.travelRepository.editTravel(data, id);
  }
}
