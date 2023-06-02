import { Strategy } from "passport-local";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { AuthService } from "../services/auth.service";
import { UserInRequest } from "../dto/user.dto";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({ usernameField: "email" });
  }

  async validate(email: string, password: string): Promise<UserInRequest> {
    const user = await this.authService.validateCredentialsAndGetUser(email, password);

    if (!user) {
      throw new UnauthorizedException();
    }

    return {
      id: user.id,
    };
  }
}
