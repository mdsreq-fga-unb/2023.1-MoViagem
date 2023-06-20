import { Body, Controller, Get, Param, Post, Put } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { EnableAuth } from "src/auth/decorators/auth.decorator";
import { CreateEventRequestDTO, EventResponseDTO } from "../dto/event.dto";
import { EventService } from "../services/event.service";

@Controller("/api/event")
@ApiTags("event")
@EnableAuth()
export class EventController {
  constructor(private eventService: EventService) {}

  @Post("create/:id")
  async create(
    @Param("id") id: number,
    @Body() createEventRequestDTO: CreateEventRequestDTO
  ): Promise<void> {
    return this.eventService.create(id, createEventRequestDTO);
  }

  @Put("editEvent/:id")
  async edit(
    @Param("id") id: number,
    @Body() editEventRequestDTO: CreateEventRequestDTO
  ): Promise<void> {
    return this.eventService.edit(id, editEventRequestDTO);
  }

  @Get("get-event/:id")
  async getHost(@Param("id") id: number): Promise<EventResponseDTO> {
    return this.eventService.getEvent(id);
  }
}
