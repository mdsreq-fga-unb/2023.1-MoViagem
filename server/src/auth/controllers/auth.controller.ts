import { Body, Controller, Delete, Param, Post, Put, Req, UseGuards } from "@nestjs/common";
import { ApiBody, ApiOkResponse, ApiTags, ApiUnauthorizedResponse } from "@nestjs/swagger";
import { User } from "@prisma/client";
import { Request } from "express";
import { LoginResponseDTO, RefreshTokenRequestDTO } from "../dto/token.dto";
import {
  UserCreateDTO,
  UserEditDTO,
  UserEditNameDTO,
  UserEditPasswordDTO,
  UserLoginDTO,
} from "../dto/user.dto";
import { LocalAuthGuard } from "../guards/local-auth.guard";
import { AuthService } from "../services/auth.service";
import { UserService } from "../services/user.service";

@Controller("auth")
@ApiTags("authentication")
export class AuthController {
  constructor(private userService: UserService, private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post("login")
  @ApiOkResponse({ type: LoginResponseDTO })
  @ApiUnauthorizedResponse()
  @ApiBody({ type: UserLoginDTO })
  async login(@Req() req: Request): Promise<LoginResponseDTO> {
    return this.authService.triggerAfterLocalLogin(req.user as User);
  }

  @Post("register")
  async register(@Body() dto: UserCreateDTO): Promise<LoginResponseDTO> {
    return this.userService.register(dto);
  }

  @Put("editEmail/:id")
  async edit(@Param("id") id: string, @Body() dto: UserEditDTO): Promise<void> {
    return this.userService.editUser(dto, id);
  }

  @Put("editName/:id")
  async editName(@Param("id") id: string, @Body() name: UserEditNameDTO): Promise<void> {
    return this.userService.editName(name, id);
  }

  @Put("editPassword/:id")
  async UserEditPassword(@Param("id") id: string, @Body() dto: UserEditPasswordDTO): Promise<void> {
    return this.userService.editPassword(dto, id);
  }

  @Post("refresh")
  async refresh(@Body() { refreshToken }: RefreshTokenRequestDTO): Promise<LoginResponseDTO> {
    return this.authService.refreshToken(refreshToken);
  }

  @Delete("deleteUser/:id")
  async deleteUser(@Param("id") id: string): Promise<void> {
    return this.userService.deleteUser(id);
  }
}
