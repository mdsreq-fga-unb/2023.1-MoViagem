import { Body, Controller, Get, Param, Post, Put } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { EnableAuth } from "src/auth/decorators/auth.decorator";
import { CreateHostRequestDTO, HostResponseDTO } from "../dto/host.dto";
import { HostService } from "../services/host.service";

@Controller("/api/host")
@ApiTags("host")
@EnableAuth()
export class HostController {
  constructor(private hostService: HostService) {}

  @Post("/:id")
  async create(@Param("id") id: number, @Body() dto: CreateHostRequestDTO): Promise<void> {
    return this.hostService.create(id, dto);
  }

  @Put("/:id")
  async edit(@Param("id") id: number, @Body() dto: CreateHostRequestDTO): Promise<void> {
    return this.hostService.edit(id, dto);
  }

  @Get("/:id")
  async get(@Param("id") id: number): Promise<HostResponseDTO> {
    return this.hostService.getHost(id);
  }
}
