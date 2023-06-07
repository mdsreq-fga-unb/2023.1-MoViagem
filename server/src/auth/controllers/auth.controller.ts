import { Body, Controller, Post, Req, UseGuards } from "@nestjs/common";
import { ApiBody, ApiOkResponse, ApiTags, ApiUnauthorizedResponse } from "@nestjs/swagger";
import { User } from "@prisma/client";
import { Request } from "express";
import { LoginResponseDTO, RefreshTokenRequestDTO } from "../dto/token.dto";
import { UserCreateDTO, UserLoginDTO, UserResponseDTO } from "../dto/user.dto";
import { LocalAuthGuard } from "../guards/local-auth.guard";
import { AuthService } from "../services/auth.service";
import { UserService } from "../services/user.service";

@Controller("auth")
@ApiTags("authentication")
export class AuthController {
  constructor(private userService: UserService, private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post("login")
  @ApiOkResponse({ type: UserResponseDTO })
  @ApiUnauthorizedResponse()
  @ApiBody({ type: UserLoginDTO })
  async login(@Req() req: Request): Promise<LoginResponseDTO> {
    return this.authService.triggerAfterLocalLogin(req.user as User);
  }

  @Post("register")
  async register(@Body() dto: UserCreateDTO): Promise<UserResponseDTO> {
    return this.userService.register(dto);
  }

  @Post("refresh")
  async refresh(@Body() { refreshToken }: RefreshTokenRequestDTO): Promise<LoginResponseDTO> {
    return this.authService.refreshToken(refreshToken);
  }
}
