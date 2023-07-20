import { Body, Controller, Delete, Patch, Put } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { EnableAuth } from "../decorators/auth.decorator";
import { User } from "../decorators/user.decorator";
import { EditPasswordRequestDTO, EditUserRequestDTO, UserInTokenDTO } from "../dto/user.dto";
import { UserService } from "../services/user.service";

@Controller("api/user")
@ApiTags("user")
@EnableAuth()
export class UserController {
  constructor(private userService: UserService) {}

  @Put()
  async edit(@User() user: UserInTokenDTO, @Body() dto: EditUserRequestDTO): Promise<void> {
    return this.userService.update(user.id, dto);
  }

  @Patch("/update-password")
  async editPassword(
    @User() user: UserInTokenDTO,
    @Body() dto: EditPasswordRequestDTO
  ): Promise<void> {
    return this.userService.updatePassword(user.id, dto);
  }

  @Delete()
  async delete(@User() user: UserInTokenDTO): Promise<void> {
    return this.userService.delete(user.id);
  }
}
