import { Controller, Get, Param, Patch } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { EnableAuth } from "src/auth/decorators/auth.decorator";
import { EventGuestResponseDTO } from "../dto/eventguests.dto";
import { EventGuestsService } from "../services/eventguests.service";

@Controller("/api/eventguests")
@ApiTags("eventguests")
@EnableAuth()
export class EventGuestsController {
  constructor(private eventGuestsService: EventGuestsService) {}

  @Patch("/:userId/add-to-event/:eventId")
  async addGuestToTravel(
    @Param("userId") userId: number,
    @Param("eventId") eventId: number
  ): Promise<void> {
    return this.eventGuestsService.addGuestToEvent(userId, eventId);
  }

  @Get("/:eventId")
  async findAllGuestsFromTravel(
    @Param("eventId") eventId: number
  ): Promise<EventGuestResponseDTO[]> {
    return this.eventGuestsService.findAllGuestsFromEvent(eventId);
  }

  @Patch("/:userId/remove-from-event/:eventId")
  async removeGuestFromEvent(
    @Param("userId") userId: number,
    @Param("eventId") eventId: number
  ): Promise<void> {
    return this.eventGuestsService.delete(userId, eventId);
  }
}
