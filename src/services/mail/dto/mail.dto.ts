import { ApiProperty } from "@nestjs/swagger";

export class MailDto {
  @ApiProperty({
    description: '发件人',
    default: 'trj@10.104.3.79'
  })
  from: string;

  @ApiProperty({
    description: '密码',
    default: '123456'
  })
  password: string;

  @ApiProperty({
    description: '收件人',
    default: 'trj@10.104.3.79'
  })
  to: string;

  @ApiProperty({
    description: '发送的内容',
    default: '测试邮件发送'
  })
  content: string
}