import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModule } from 'src/CURD/modules/user.module';
import { PassportModule } from '@nestjs/passport/dist';
import { LocalStrategy } from './local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    UserModule,
    PassportModule.register({ defaultStrategy: 'jwt' }), // 默认策略
    // PassportModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (cf: ConfigService) => {
        return cf.get('jwt_config');
      },
    }),
  ], // 导入 UsersModule
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService], 
})
export class AuthModule {}
