import {
  Controller,
  Get,
  Session,
  Res,
} from '@nestjs/common';
import { UserService } from '../services/user.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller({
  version: '1.0',
  path: 'user',
})
@ApiTags('用户管理')
export class UserController {
  constructor(
    private readonly userService: UserService,
  ) {}

  // @UseGuards(AuthGuard('jwt'))
  @Get('getCode')
  @ApiOperation({
    summary: '获取验证码',
  })
  getCode(@Session() session, @Res() res) {
    const svgCode = this.userService.getCode();
    session.code = svgCode.text;
    res.type('image/svg+xml');
    res.send(svgCode.data);
  }
}
