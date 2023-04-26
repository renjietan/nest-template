//   /src/common/guards/auth.guard.ts
import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import CommonConfig from "../config/env/common";


@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext) {
    const isNoAuth = this.reflector.getAllAndOverride('isNoAuth', [
      //NOTE(@date:2023-04-26 10:17:47 谭人杰): 获取那个controller被执行了
      context.getHandler(),
      context.getClass(),
    ]);
    const url:string = context.switchToHttp().getRequest().url
    if (isNoAuth || url == CommonConfig.statusMonitorConfig.path) return true;

    return super.canActivate(context);
  }
}