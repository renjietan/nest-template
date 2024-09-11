import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { MailService } from './mail.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { isNoAuth } from 'src/utils/decorator/jwt.decorator';
import { MailDto } from './dto/mail.dto';


@ApiTags('邮箱服务')
@Controller('mail')
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @ApiOperation({
    summary: '发送邮件'
  })
  @isNoAuth()
  @Post('send')
  async send(@Query() params: MailDto) {
    return await this.mailService.send(params);
  }
}
