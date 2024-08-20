import { ApiProperty, OmitType, PickType } from '@nestjs/swagger';
import { RecordEntyty } from 'src/entities/record.entity';

export class RecordDto {
  @ApiProperty({
    description: '唯一ID',
    required: false
  })
  id?: number | null;

  @ApiProperty({
    description: '操作名称',
    example: '温度',
  })
  name: string;

  @ApiProperty({
    description: '操作类型',
    example: '加温',
  })
  type: string;

  @ApiProperty({
    description: '描述',
    example: '天气转凉咯，要加温',
    required: false,
  })
  desc: string;

  @ApiProperty({
    description: '操作人',
    example: '业务员',
  })
  createBy: string;

  @ApiProperty({
    description: '创建时间',
    example: null,
    required: false
  })
  createTime: string | null;
}