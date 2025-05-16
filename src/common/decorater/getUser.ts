// src/auth/decorators/get-user.decorator.ts
import { createParamDecorator, ExecutionContext } from "@nestjs/common";

export const GetUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    console.log(request);
    return request.user; // `user` is attached by the JwtAuthGuard
  },
);
