import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { EnvironmentService } from "../../environment/services/environment.service";
import { AccessTokenPayload } from "../dto/token.dto";
import { UserInTokenDTO } from "../dto/user.dto";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(env: EnvironmentService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: env.jwtSecret,
    });
  }

  async validate(payload: AccessTokenPayload): Promise<UserInTokenDTO> {
    return payload.user;
  }
}
