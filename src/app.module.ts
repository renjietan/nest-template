import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';

import { APP_GUARD } from '@nestjs/core';
import { StatusMonitorModule } from 'nest-status-monitor';
import { configModule } from './utils/config/config.module';
import { AuthModule } from './modules/auth.module';
import { JwtAuthGuard } from './utils/guard/auth.guard';
import CommonConfig from "./utils/config/env/common";
import { UserModule } from './modules/user.module';

@Module({
  imports: [
    //NOTE(@date:2023-04-26 09:54:13 谭人杰): 9、添加服务监控
    StatusMonitorModule.setUp(CommonConfig.statusMonitorConfig),
    //NOTE(@date:2023-04-17 17:18:52 谭人杰): 8、添加mysql
    TypeOrmModule.forRootAsync({
      //NOTE(@date:2023-04-18 13:58:39 谭人杰): 7、引入配置文件
      imports: [configModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return configService.get('sqlite');
      },
    }),
    // UserModule,
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
