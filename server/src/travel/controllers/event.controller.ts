import { Body, Controller, Get, Param, Post, Put, Delete } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { EnableAuth } from "src/auth/decorators/auth.decorator";
import { CreateEventRequestDTO, EventResponseDTO } from "../../travel/dto/event.dto";
import { EventService } from "../services/event.service";

@Controller("/api/event")
@ApiTags("event")
@EnableAuth()
export class EventController {
  constructor(private eventService: EventService) {}

  @Post("/:id")
  async create(@Param("id") id: number, @Body() dto: CreateEventRequestDTO): Promise<void> {
    return this.eventService.create(id, dto);
  }

  @Put("/:id")
  async edit(@Param("id") id: number, @Body() dto: CreateEventRequestDTO): Promise<void> {
    return this.eventService.edit(id, dto);
  }

  @Get("/:travelId")
  async listByUser(@Param("travelId") travelId: number): Promise<EventResponseDTO[]> {
    return this.eventService.getEventsByTravel(travelId);
  }

  @Get("/:id")
  async get(@Param("id") id: number): Promise<EventResponseDTO> {
    return this.eventService.getEvent(id);
  }

  @Delete("/:id")
  async delete(@Param("id") id: number): Promise<void> {
    return this.eventService.delete(id);
  }
}
