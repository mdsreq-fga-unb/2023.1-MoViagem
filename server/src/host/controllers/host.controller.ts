import { Body, Controller, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { EnableAuth } from "src/auth/decorators/auth.decorator";
import { User } from "src/auth/decorators/user.decorator";
import { UserInfoDTO } from "src/auth/dto/token.dto";
import { CreateHostRequestDTO } from "../dto/host.dto";
import { HostService } from "../services/host.service";

@Controller("/api/host")
@ApiTags("host")
@EnableAuth()
export class HostController {
  constructor(private hostService: HostService) {}

  @Post()
  async create(
    @User() loggedInUser: UserInfoDTO,
    @Body() createHostRequestDTO: CreateHostRequestDTO
  ): Promise<void> {
    return this.hostService.create(loggedInUser.id, createHostRequestDTO);
  }
}
