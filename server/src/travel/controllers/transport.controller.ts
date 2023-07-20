import { Body, Controller, Get, Param, Post, Put } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { EnableAuth } from "src/auth/decorators/auth.decorator";
import { User } from "src/auth/decorators/user.decorator";
import { UserInTokenDTO } from "src/auth/dto/user.dto";
import { CreateTransportRequestDTO, TransportResponseDTO } from "../dto/transport.dto";
import { TransportService } from "../services/transport.service";

@Controller("/api/transport")
@ApiTags("transport")
@EnableAuth()
export class TransportController {
  constructor(private transportService: TransportService) {}

  @Post("/:id")
  async create(
    @User() user: UserInTokenDTO,
    @Param("id") id: number,
    @Body() dto: CreateTransportRequestDTO
  ): Promise<void> {
    return this.transportService.create(user.id, id, dto);
  }

  @Get("/:id")
  async get(@Param("id") id: number): Promise<TransportResponseDTO> {
    return this.transportService.getTransport(id);
  }

  @Put("/:id")
  async edit(
    @User() user: UserInTokenDTO,
    @Param("id") id: number,
    @Body() dto: CreateTransportRequestDTO
  ): Promise<void> {
    return this.transportService.editTransport(user.id, id, dto);
  }
}
