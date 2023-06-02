import { ExtractJwt, Strategy } from "passport-jwt";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable } from "@nestjs/common";
import { EnvironmentService } from "src/environment/services/environment.service";
import { UserInRequest } from "../dto/user.dto";
import { AccessTokenPayload } from "../dto/token.dto";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(env: EnvironmentService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: env.jwtSecret,
    });
  }

  async validate(payload: AccessTokenPayload): Promise<UserInRequest> {
    return {
      id: parseInt(payload.sub, 10),
    };
  }
}
