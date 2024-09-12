import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';

import { APP_GUARD } from '@nestjs/core';
import { StatusMonitorModule } from 'nest-status-monitor';
import { configModule } from './config/config.module';
import { AuthModule } from './services/auth/auth.module';
import { JwtAuthGuard } from './utils/guard/auth.guard';
import CommonConfig from "./config/env/common";
import { MailModule } from './services/mail/mail.module';
import { UploadModule } from './services/upload/upload.module';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname, join } from 'path';

@Module({
  imports: [
    // MulterModule.register({
    //   storage: diskStorage({
    //     //NOTE(@date:2023-04-13 14:46:04 谭人杰): 设置保存路径
    //     destination: join(__dirname, 'assets'),
    //     filename(req, file, callback) {
    //       callback(
    //         null,
    //         `${new Date().getTime()}-${extname(file.originalname)}`,
    //       );
    //     },
    //   }),
    // }),
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
    AppModule,
    UploadModule,
    MailModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [
    //注册邮箱服务
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
