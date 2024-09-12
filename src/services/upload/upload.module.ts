import { Module, Injectable } from '@nestjs/common';
import { UploadService } from './upload.service';
import { UploadController } from './upload.controller';
import { MulterModule } from '@nestjs/platform-express';
import { extname, join } from 'path';
import { diskStorage } from 'multer';
import config from "../../config/env/index";

@Module({
  imports: [
    MulterModule.register({
      storage: diskStorage({
        //NOTE(@date:2023-04-13 14:46:04 谭人杰): 设置保存路径
        destination: config().email_file_path,
        filename(req, file, callback) {
          callback(
            null,
            `${new Date().getTime()}-${extname(file.originalname)}`,
          );
        },
      }),
    }),
  ],
  controllers: [UploadController],
  providers: [UploadService],
})
export class UploadModule {}
