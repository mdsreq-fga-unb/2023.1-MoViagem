import { Body, Controller, Delete, Param, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { EnableAuth } from "src/auth/decorators/auth.decorator";
import { CreateEventGuestsRequestDTO } from "../dto/eventguests.dto";
import { EventGuestsService } from "../services/eventguests.service";

@Controller("/api/event/eventguests")
@ApiTags("eventguests")
@EnableAuth()
export class EventGuestsController {
  constructor(private eventGuestsService: EventGuestsService) {}

  // id da viagem
  // So pode se adionar num evento o usuario
  // que foi convidado na viagem de outro usuario (no caso o admin)
  @Post()
  async create(@Param("id") id: number, @Body() dto: CreateEventGuestsRequestDTO): Promise<void> {
    return this.eventGuestsService.create(id, dto);
  }

  // @Get("/:id")
  // async get(@Param("id") id: number): Promise<EventResponseDTO> {
  //   return this.eventService.getEvent(id);
  // }

  @Delete("/:id")
  async delete(@Param("id") id: number): Promise<void> {
    return this.eventGuestsService.delete(id);
  }
}
