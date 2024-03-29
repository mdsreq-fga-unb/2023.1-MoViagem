import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { EnableAuth } from "src/auth/decorators/auth.decorator";
import { User } from "src/auth/decorators/user.decorator";
import { UserInTokenDTO } from "src/auth/dto/user.dto";
import {
  CreateTravelRequestDTO,
  TravelsResponseDTO,
  TravelsWithInfoResponseDTO,
  UpdateTravelRequestDTO,
} from "../dto/travel.dto";
import { TravelService } from "./../services/travel.service";

@Controller("/api/travel")
@ApiTags("travel")
@EnableAuth()
export class TravelController {
  constructor(private travelService: TravelService) {}

  @Post()
  async create(@User() user: UserInTokenDTO, @Body() dto: CreateTravelRequestDTO): Promise<void> {
    return this.travelService.create(user.id, dto);
  }

  @Put("/:id")
  async edit(
    @User() user: UserInTokenDTO,
    @Param("id") id: number,
    @Body() dto: UpdateTravelRequestDTO
  ): Promise<void> {
    return this.travelService.edit_Travel(user.id, id, dto);
  }

  @Get()
  async listByUser(@User() user: UserInTokenDTO): Promise<TravelsResponseDTO[]> {
    return this.travelService.getTravelsByUser(user.id);
  }

  @Get("/being-guest")
  async listBeingGuest(@User() user: UserInTokenDTO): Promise<TravelsResponseDTO[]> {
    return this.travelService.getTravelsBeingGuest(user.id);
  }

  @Get("/with-info/:id")
  async getWithInfo(@Param("id") id: number): Promise<TravelsWithInfoResponseDTO> {
    return this.travelService.getTravelsWithInfo(id);
  }

  @Delete("/:id")
  async delete(@User() user: UserInTokenDTO, @Param("id") id: number): Promise<void> {
    return this.travelService.delete(user.id, id);
  }
}
