import { Body, Controller, Param, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { EnableAuth } from "src/auth/decorators/auth.decorator";
import { CreateHostRequestDTO } from "../dto/host.dto";
import { HostService } from "../services/host.service";

@Controller("/api/host")
@ApiTags("host")
@EnableAuth()
export class HostController {
  constructor(private hostService: HostService) {}

  @Post("editHost/:id")
  async create(
    @Param("id") id: number,
    @Body() createHostRequestDTO: CreateHostRequestDTO
  ): Promise<void> {
    return this.hostService.create(id, createHostRequestDTO);
  }

  // @Put("editHost/:id")
  // async editName(
  //   @Param("id") id: string,
  //   @Body() editHostRequestDTO: EditHostRequestDTO
  // ): Promise<void> {
  //   return this.hostService.edit(id, editHostRequestDTO);
  // }
}
