import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt/dist';
import { UserService } from 'src/services/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  /* 检查用户是否已存在 + 校验密码 */
  async validateUser(username: string, pwd: string) {
    const user = await this.usersService.getOneUser(username, pwd); // 获取用户
    if (user) {
      return user; // 返回用户信息
    }
    return null; // 用户不存在 / 密码错误
  }
  
  async login(user: any) {
    const payload = { username: user.username, userId: user.id };
    return {
      ...user,
      // 使用 jwtService.sign() 基于 payload 生成 token 字符串
      access_token: this.jwtService.sign(payload),
    };
  }
}
