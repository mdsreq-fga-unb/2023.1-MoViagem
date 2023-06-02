import { Body, Controller, Post, Req, UseGuards } from "@nestjs/common";
import { Request } from "express";
import { LocalAuthGuard } from "../guards/local-auth.guard";
import { ApiOkResponse, ApiBody, ApiUnauthorizedResponse, ApiTags } from "@nestjs/swagger";
import { UserCreateDTO, UserInRequest, UserLoginDTO, UserResponseDTO } from "../dto/user.dto";
import { UserService } from "../services/user.service";
import { AuthService } from "../services/auth.service";
import { LoginResponseDTO, RefreshTokenRequestDTO } from "../dto/token.dto";

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
    return this.authService.triggerAfterLocalLogin(req.user as UserInRequest);
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
