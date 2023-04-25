//   /src/common/guards/auth.guard.ts
import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext) {
    const isNoAuth = this.reflector.getAllAndOverride('isNoAuth', [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isNoAuth) return true;

    return super.canActivate(context);
  }
}