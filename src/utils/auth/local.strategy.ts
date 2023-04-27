import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AuthService } from '../../services/auth.service';

@Injectable() // 通过 PassportStrategy 使用 local 策略
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super();
  } 

  async validate(username: string, password: string) {
    const user = await this.authService.validateUser(username, password);
    if (!user) {
      throw new HttpException('用户不存在', HttpStatus.BAD_REQUEST); // 返回 '未授权' 错误 (401)
    }
    return user; // 返回用户信息
  }
}
