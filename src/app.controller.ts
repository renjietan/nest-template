import { Body, Controller, Get, Param, Post, Query, Req, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthService } from './services/auth.service';
import { isNoAuth } from './utils/decorator/jwt.decorator';
import { UserDto } from './Dto/user.dto';

@Controller({
  version: '1.0'
})
@ApiTags('基础模块')
export class AppController {
  constructor(private readonly authService: AuthService) {}
  // @UseGuards(AuthGuard('local')) // 启用本地策略
  @isNoAuth()
  @Post('login')
  @ApiOperation({
    summary: '登录'
  })
  async login(@Query() user: UserDto) {
    // Passport 会根据 validate() 方法的返回值创建一个 user 对象
    // 并以 req.user 的形式分配给请求对象
    return this.authService.login(user);
  }
}
