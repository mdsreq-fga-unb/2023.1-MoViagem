import { Body, Controller, Get, Param, Post, Put } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { EnableAuth } from "src/auth/decorators/auth.decorator";
import { User } from "src/auth/decorators/user.decorator";
import { UserInTokenDTO } from "src/auth/dto/user.dto";
import { CreateHostRequestDTO, HostResponseDTO } from "../dto/host.dto";
import { HostService } from "../services/host.service";

@Controller("/api/host")
@ApiTags("host")
@EnableAuth()
export class HostController {
  constructor(private hostService: HostService) {}

  @Post("/:id")
  async create(
    @User() user: UserInTokenDTO,
    @Param("id") id: number,
    @Body() dto: CreateHostRequestDTO
  ): Promise<void> {
    return this.hostService.create(user.id, id, dto);
  }

  @Put("/:id")
  async edit(
    @User() user: UserInTokenDTO,
    @Param("id") id: number,
    @Body() dto: CreateHostRequestDTO
  ): Promise<void> {
    return this.hostService.edit(user.id, id, dto);
  }

  @Get("/:id")
  async get(@Param("id") id: number): Promise<HostResponseDTO> {
    return this.hostService.getHost(id);
  }
}
