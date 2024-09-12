import { ApiProperty } from '@nestjs/swagger';

export class CreateUploadDto {
  @ApiProperty({
    description: 'USER ID',
    required: true,
  })
  id: string;
  // @ApiProperty({
  //   description: '文件上传',
  //   required: true,
  // })
  // file: Express.Multer.File;
}
