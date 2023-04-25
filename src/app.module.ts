import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { configModule } from './config/config.module';
import { AuthModule } from './auth/auth.module';
import { JwtAuthGuard } from './auth/auth.guard';
import { APP_GUARD } from '@nestjs/core';
import { UserModule } from './CURD/modules/user.module';
@Module({
  imports: [
    //NOTE(@date:2023-04-17 17:18:52 谭人杰): 6、添加mysql
    TypeOrmModule.forRootAsync({
      //NOTE(@date:2023-04-18 13:58:39 谭人杰): 5、引入配置文件
      imports: [configModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return configService.get('mysql');
      },
    }),
    UserModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
