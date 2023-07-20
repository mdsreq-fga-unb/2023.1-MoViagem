import { Controller, Get, Param, Patch } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { EnableAuth } from "src/auth/decorators/auth.decorator";
import { User } from "src/auth/decorators/user.decorator";
import { UserInTokenDTO } from "src/auth/dto/user.dto";
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
    @User() user: UserInTokenDTO,
    @Param("guestEmail") guestEmail: string,
    @Param("travelId") travelId: number
  ): Promise<void> {
    return this.guestService.addGuestToTravel(user.id, guestEmail, travelId);
  }

  @Patch("/:guestId/enable-editing/:travelId")
  async toggleGuestEditing(
    @User() user: UserInTokenDTO,
    @Param("guestId") guestId: number,
    @Param("travelId") travelId: number
  ): Promise<void> {
    return this.guestService.toggleGuestEditing(user.id, guestId, travelId);
  }
}
