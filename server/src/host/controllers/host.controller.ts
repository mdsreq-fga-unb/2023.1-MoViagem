import { Body, Controller, Get, Param, Post, Put } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { CreateHostRequestDTO, HostResponseDTO } from "../dto/host.dto";
import { HostService } from "../services/host.service";

@Controller("/api/host")
@ApiTags("host")
// @EnableAuth()
export class HostController {
  constructor(private hostService: HostService) {}

  @Post("create/:id")
  async create(
    //
    @Param("id") id: number,
    @Body() createHostRequestDTO: CreateHostRequestDTO
  ): Promise<void> {
    return this.hostService.create(id, createHostRequestDTO);
  }

  @Put("editHost/:id")
  async editName(
    @Param("id") id: number,
    @Body() editHostRequestDTO: CreateHostRequestDTO
  ): Promise<void> {
    return this.hostService.edit(id, editHostRequestDTO);
  }

  @Get("get-host/:id")
  async getHost(@Param("id") id: number): Promise<HostResponseDTO> {
    return this.hostService.getHost(id);
  }
}
