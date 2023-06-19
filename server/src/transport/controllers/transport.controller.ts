import { Body, Controller, Get, Param, Post, Put } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { EnableAuth } from 'src/auth/decorators/auth.decorator';
import { CreateTransportRequestDTO, TransportResponseDTO } from "../dto/transport.dto";
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
    console.log("chegou na controller")
    return this.transportService.create(id, createTransportRequestDTO);
  }

  @Get("get-transport/:id")
  async getHost(@Param("id") id: number): Promise<TransportResponseDTO> {
    return this.transportService.getTransport(id);
  }

  @Put("edit-transport/:id")
  async editTransport(
    @Param("id") id: number,
    @Body() editTransportRequestDTO: CreateTransportRequestDTO
  ): Promise<void> {
    return this.transportService.editTransport(id, editTransportRequestDTO);
  }
}
