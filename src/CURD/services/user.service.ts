import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/CURD/entities/user.entity';
import * as svgCaptcha from 'svg-captcha';
import { Repository } from 'typeorm';
@Injectable()
export class UserService {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor(@InjectRepository(UserEntity) private readonly user:Repository<UserEntity>,) {
    
  }
  getCode() {
    const r = (Math.random() * 255).toFixed();
    const g = (Math.random() * 255).toFixed();
    const b = (Math.random() * 255).toFixed();
    const o = Math.random().toFixed(2);
    const svg = svgCaptcha.create({
      size: 1, //生成几个验证码
      fontSize: 50, //文字大小
      width: 100, //宽度
      height: 34, //高度
      background: `rgba(${r},${g},${b},${o})`, //背景
    });
    return svg
  }

  getOneUser(username: string, password: string) {
    const u = this.user.findOne({
      where: {
        username,
        password,
      }
    })
    return u
  }
}
