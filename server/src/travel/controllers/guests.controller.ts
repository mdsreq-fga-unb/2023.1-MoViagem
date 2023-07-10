import { Body, Controller, Delete, Param, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { EnableAuth } from "src/auth/decorators/auth.decorator";
import { CreateGuestsRequestDTO } from "../dto/guests.dto";
import { GuestsService } from "../services/guests.service";

@Controller("/api/traval/guests")
@ApiTags("guests")
@EnableAuth()
export class GuestsController {
  constructor(private guestsService: GuestsService) {}

  // id da viagem
  // adiona a inforcacao - usuario e qual viagem ele
  // ira participar na tabela Guests

  // Sugestao para criacao de admin
  // Pode-se subentender que o admin e quem criou a viagem
  // na tabela travel tem o id do usuario que criou
  // so podera fazer cadastro de conviado naquela viagem
  // o usuaio que possuir o id na tabela viagem

  // Dai a viagem com suas dependecias tambem apareceram
  // na lista de viagens do convidado (de modo nao editavel)
  @Post()
  async create(@Param("id") id: number, @Body() dto: CreateGuestsRequestDTO): Promise<void> {
    return this.guestsService.create(id, dto);
  }

  // Aqui deve ser uma lista de convidados
  // nao importa quantos tenha cadastrados
  // todos tem que aparecer e a medida que for
  // adicionando vai aparecendo mais
  // um array
  // @Get()
  // async get(@Param("id") id: number): Promise<GuestsResponseDTO> {
  //   return this.eventService.getGuestsList(id);
  // }

  // Deleta o convidado da viagam
  // deleta a linha da tabela Guests
  @Delete("/:id")
  async delete(@Param("id") id: number): Promise<void> {
    return this.guestsService.delete(id);
  }
}
