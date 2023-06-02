import { Injectable, Logger, UnauthorizedException } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

@Injectable()
export class LocalAuthGuard extends AuthGuard("local") {
  private logger = new Logger(LocalAuthGuard.name);

  // Override the default behavior of AuthGuard
  // to log only in debug mode
  handleRequest(err: any, user: any, info: any) {
    if (err) {
      this.logger.debug(err.message);
      throw err;
    }

    if (!user) {
      this.logger.debug(info);
      throw new UnauthorizedException();
    }

    return user;
  }
}
