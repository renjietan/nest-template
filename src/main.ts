import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
//NOTE(@date:2023-04-17 17:09:53 谭人杰): 配置swagger，首次引入
import { NestExpressApplication } from '@nestjs/platform-express';
import { VersioningType } from '@nestjs/common';
import * as session from 'express-session';
import ValidatePipe from './utils/pipe/validate.pipe';
import { HttpCatchFilter } from './utils/Filter/HttpCatchFilter';
import TransformInterceptor from './utils/interceptor/transform.interceptor';
import { logger } from './utils/middleWave/logger/logger.middleWave';
import { join } from 'path';
import config from './config/env/index';
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: true,
  });

  //NOTE(@date:2023-04-17 17:13:26 谭人杰): 1、开启版本号
  app.enableVersioning({
    // 显示在URL中
    type: VersioningType.URI,
  });

  // NOTE(2024-09-11 16:33:36 谭人杰): 添加静态目录
  app.useStaticAssets(config().assets_path, {
    // 添加路径前缀
    prefix: '/assets',
  });

  // NOTE(2024-09-12 15:42:48 谭人杰): 邮件附件保存位置
  app.useStaticAssets(config().email_file_path, {
    // 添加路径前缀
    prefix: '/email',
  });

  //  解决跨域
  app.enableCors({
    credentials: true,
    origin: true,
  });

  //NOTE(@date:2023-04-17 17:16:34 谭人杰): 2、添加swagger配置
  const options = new DocumentBuilder()
    .setTitle('服务API')
    .setDescription('大屏接口')
    .setVersion('1')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('/api-docs', app, document);

  //NOTE(@date:2023-04-17 17:44:03 谭人杰): 3、注册日志中间件
  app.use(logger);

  //NOTE(@date:2023-04-21 13:24:57 谭人杰): 4、添加错误Filter
  app.useGlobalFilters(new HttpCatchFilter());

  //NOTE(@date:2023-04-25 21:03:32 谭人杰): 5、数据统一返回格式
  app.useGlobalInterceptors(TransformInterceptor);

  //NOTE(@date:2023-04-25 21:48:48 谭人杰): 6、添加pipe：验证前端传过来的参数
  app.useGlobalPipes(ValidatePipe);

  //NOTE(@date:2023-04-22 14:43:25 谭人杰): sessions
  app.use(
    session({
      secret: 'node', // 生成服务端session 签名 可以理解为加盐
      name: 'nest', // 生成客户端cookie 的名字 默认 connect.sid
      rolling: true, // 在每次请求时强行设置 cookie，这将重置 cookie 过期时间(默认:false)
      //设置返回到前端 key 的属性，默认值为{ path: ‘/’, httpOnly: true, secure: false, maxAge: null }。
      resave: false,
      saveUninitialized: true,
      cookie: { maxAge: null },
    }),
  );
  await app.listen(3001);
}
bootstrap();
