import { BadRequestException, Injectable } from "@nestjs/common";
import { GeocodingService } from "src/travel/services/geocoding.service";
import { HostResponseDTO } from "../dto/host.dto";
import { TransportResponseDTO } from "../dto/transport.dto";
import {
  CreateTravelRequestDTO,
  TravelsResponseDTO,
  TravelsWithInfoResponseDTO,
} from "../dto/travel.dto";
import { TravelRepository } from "./../repositories/travel.repository";
import { WeatherForecastService } from "./weather-forecast.service";

@Injectable()
export class TravelService {
  constructor(
    private travelRepository: TravelRepository,
    private geocodingService: GeocodingService,
    private weatherForecastService: WeatherForecastService
  ) {}

  async getTravelsByUser(userId: number): Promise<TravelsResponseDTO[]> {
    const travels = await this.travelRepository.findAllByUser(userId);

    return travels.map((travel) => new TravelsResponseDTO(travel));
  }

  async getTravelsBeingGuest(userId: number): Promise<TravelsResponseDTO[]> {
    const travels = await this.travelRepository.findAllBeingGuest(userId);

    return travels.map((travel) => new TravelsResponseDTO(travel));
  }

  async create(id: number, dto: CreateTravelRequestDTO): Promise<void> {
    if (dto.startDate > dto.endDate) {
      throw new BadRequestException("data de inicio não pode ser depois da data de fim");
    }

    const coordinates = await this.geocodingService.getCoordinates(dto.local);

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
      latitude: coordinates?.lat,
      longitude: coordinates?.lon,
    });

    this.weatherForecastService.getForecastsOfAllTravels();
  }

  async getTravels(id: number): Promise<TravelsResponseDTO> {
    const travel = await this.travelRepository.findById(id);

    if (travel == null) {
      throw new BadRequestException("viagem nao existe");
    }

    return new TravelsResponseDTO(travel);
  }

  async edit_Travel(id: number, dto: CreateTravelRequestDTO): Promise<void> {
    if (dto.startDate > dto.endDate) {
      throw new BadRequestException("data de inicio não pode ser depois da data de fim");
    }

    const coordinates = await this.geocodingService.getCoordinates(dto.local);

    await this.travelRepository.update(id, {
      local: dto.local,
      startDate: dto.startDate,
      endDate: dto.endDate,
      description: dto.description,
      numParticipants: dto.numParticipants,
      latitude: coordinates !== null ? coordinates.lat : null,
      longitude: coordinates !== null ? coordinates.lon : null,
    });

    this.weatherForecastService.getForecastsOfAllTravels();
  }

  async delete(id: number): Promise<void> {
    return this.travelRepository.deleteById(id);
  }

  async getTravelsWithInfo(id: number): Promise<TravelsWithInfoResponseDTO> {
    const travel = await this.travelRepository.findByIdIncludingHostAndTransport(id);

    if (travel == null) {
      throw new BadRequestException("viagem nao existe");
    }

    return new TravelsWithInfoResponseDTO({
      ...travel,
      host: travel.host != null ? new HostResponseDTO(travel.host) : null,
      transport: travel.transport != null ? new TransportResponseDTO(travel.transport) : null,
    });
  }
}
