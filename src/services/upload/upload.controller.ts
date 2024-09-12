import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  Query,
} from '@nestjs/common';
import { UploadService } from './upload.service';
import { UpdateUploadDto } from './dto/update-upload.dto';
import {
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { isNoAuth } from 'src/utils/decorator/jwt.decorator';
import { CreateUploadDto } from './dto/create-upload.dto';
import { ConfigService } from '@nestjs/config';
import { extname, join } from 'path';
import { createWriteStream } from 'fs';
@ApiTags('文件上传模块')
@Controller('upload')
export class UploadController {
  constructor(
    private readonly uploadService: UploadService,
    private readonly configService: ConfigService,
  ) {}

  @isNoAuth()
  @ApiOperation({
    summary: '文件上传',
  })
  @UseInterceptors(FileInterceptor('file'))
  @Post(':id')
  // @UseInterceptors(FileInterceptor('file'))
  emailFile(
    @Param() query: CreateUploadDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const assets_path = this.configService.get('assets_path')
    const ext = extname(file.originalname)
    const filename = `${new Date().getTime()}-${ext}`
    const stream = createWriteStream(join(assets_path, filename))
    stream.write(file.buffer)
    stream.close()    
    return '上传成功';
  }

  @Get()
  findAll() {
    return this.uploadService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.uploadService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUploadDto: UpdateUploadDto) {
    return this.uploadService.update(+id, updateUploadDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.uploadService.remove(+id);
  }
}
