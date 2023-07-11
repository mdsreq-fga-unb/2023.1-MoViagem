import { Controller, Get, Param, Patch } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { EnableAuth } from "src/auth/decorators/auth.decorator";
import { GuestResponseDTO } from "../dto/guest.dto";
import { GuestService } from "../services/guest.service";

@Controller("/api/guest")
@ApiTags("guest")
@EnableAuth()
export class GuestController {
  constructor(private guestService: GuestService) {}

  @Get("/:travelId")
  async findAllGuestsFromTravel(@Param("travelId") travelId: number): Promise<GuestResponseDTO[]> {
    return this.guestService.findAllGuestsFromTravel(travelId);
  }

  @Patch("/:guestEmail/add-to-travel/:travelId")
  async addGuestToTravel(
    @Param("guestEmail") guestEmail: string,
    @Param("travelId") travelId: number
  ): Promise<void> {
    return this.guestService.addGuestToTravel(guestEmail, travelId);
  }
}
