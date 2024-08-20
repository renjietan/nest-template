import { ApiProperty, OmitType, PickType } from '@nestjs/swagger';
import { RecordEntyty } from 'src/entities/record.entity';

export class RecordListDto {
  @ApiProperty({
    description: '操作名称',
    example: '温度',
    required: false
  })
  name: string | null;

  @ApiProperty({
    description: '操作类型',
    example: '加温',
    required: false
  })
  type: string | null;

  @ApiProperty({
    description: '操作人',
    example: '业务员',
    required: false
  })
  createBy: string | null;

  @ApiProperty({
    description: '开始时间',
    example: '2024-08-20 00:00:00',
    required: false
  })
  startTime: string | null;

  @ApiProperty({
    description: '结束时间',
    example: '2024-08-20 23:59:59',
    required: false
  })
  endTime: string | null;

  @ApiProperty({
    description: '页码',
    example: 1,
  })
  pageNum: number | null;

  @ApiProperty({
    description: '条数',
    example: 10,
  })
  pageSize: number | null;
}