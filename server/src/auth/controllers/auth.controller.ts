import { Body, Controller, Post, Req, UseGuards } from "@nestjs/common";
import { ApiBody, ApiOkResponse, ApiTags, ApiUnauthorizedResponse } from "@nestjs/swagger";
import { User } from "@prisma/client";
import { Request } from "express";
import { LoginResponseDTO, RefreshTokenRequestDTO } from "../dto/token.dto";
import { CreateUserRequestDTO, LoginRequestDTO } from "../dto/user.dto";
import { LocalAuthGuard } from "../guards/local-auth.guard";
import { AuthService } from "../services/auth.service";

@Controller("auth")
@ApiTags("authentication")
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post("login")
  @ApiOkResponse({ type: LoginResponseDTO })
  @ApiUnauthorizedResponse()
  @ApiBody({ type: LoginRequestDTO })
  async login(@Req() req: Request): Promise<LoginResponseDTO> {
    return this.authService.triggerAfterLocalLogin(req.user as User);
  }

  @Post("register")
  async register(@Body() dto: CreateUserRequestDTO): Promise<LoginResponseDTO> {
    return this.authService.register(dto);
  }

  @Post("refresh")
  async refresh(@Body() { refreshToken }: RefreshTokenRequestDTO): Promise<LoginResponseDTO> {
    return this.authService.refreshToken(refreshToken);
  }
}
