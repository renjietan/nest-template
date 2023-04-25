import { Body, Controller, Get, Param, Post, Query, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth/auth.service';
import { UserDto } from './CURD/Dto/user.dto';
import validatePipe from './pipe/validate.pipe';
import { isNoAuth } from './decorator/jwt.decorator';

@Controller({
  version: '1.0'
})
export class AppController {
  constructor(private readonly authService: AuthService) {}
  // @UseGuards(AuthGuard('local')) // 启用本地策略
  @isNoAuth()
  @Post('login')
  async login(@Query() user) {
    // Passport 会根据 validate() 方法的返回值创建一个 user 对象
    // 并以 req.user 的形式分配给请求对象
    return this.authService.login(user);
  }
}
