import { createParamDecorator, ExecutionContext, UnauthorizedException } from "@nestjs/common";
import { UserInRequest } from "../dto/user.dto";

export const User = createParamDecorator((_: unknown, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();
  const user = request.user;

  if (!user) {
    throw new UnauthorizedException();
  }

  return user as UserInRequest;
});
