import { Body, Controller, Get, Param, Post, Put } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { EnableAuth } from "src/auth/decorators/auth.decorator";
import { User } from "src/auth/decorators/user.decorator";
import { UserInfoDTO } from "src/auth/dto/token.dto";
import { CreateTravelRequestDTO, TravelsResponseDTO } from "../dto/travel.dto";
import { TravelService } from "./../services/travel.service";

@Controller("/api/travel")
@ApiTags("travel")
@EnableAuth()
export class TravelController {
  constructor(private travelService: TravelService) {}

  @Post()
  async create(
    @User() loggedInUser: UserInfoDTO,
    @Body() createTravelRequestDTO: CreateTravelRequestDTO
  ): Promise<void> {
    return this.travelService.create(loggedInUser.id, createTravelRequestDTO);
  }

  @Get()
  async getTravelsByUser(@User() loggedInUser: UserInfoDTO): Promise<TravelsResponseDTO[]> {
    return this.travelService.getTravelsByUser(loggedInUser.id);
  }

  @Get("get-travels/:id")
  async getTravels(@Param("id") id: string): Promise<TravelsResponseDTO> {
    return this.travelService.getTravels(id);
  }

  @Put("edit-travel/:id")
  async editTravel(@Param("id") id: string, @Body() dto: CreateTravelRequestDTO): Promise<void> {
    return this.travelService.edit_Travel(dto, id);
  }
}