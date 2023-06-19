import { Body, Controller, Param, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { EnableAuth } from "src/auth/decorators/auth.decorator";
import { CreateTransportRequestDTO } from "../dto/transport.dto";
import { TransportService } from "../services/transport.service";

@Controller("/api/transport")
@ApiTags("transport")
@EnableAuth()
export class TransportController {
  constructor(private transportService: TransportService) {}

  @Post("create/:id")
  async create(
    @Param("id") id: number,
    @Body() createTransportRequestDTO: CreateTransportRequestDTO
  ): Promise<void> {
    return this.transportService.create(id, createTransportRequestDTO);
  }

  // @Put("editHost/:id")
  // async editName(
  //   @Param("id") id: string,
  //   @Body() editHostRequestDTO: EditHostRequestDTO
  // ): Promise<void> {
  //   return this.hostService.edit(id, editHostRequestDTO);
  // }
}
