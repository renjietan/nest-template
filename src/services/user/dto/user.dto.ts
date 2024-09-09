import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class UserDto {
  @ApiProperty({
    type: String,
    name: 'id',
    required: false,
  })
  id: string;
  
  @IsNotEmpty({
    message: '账号不可为空',
  })
  @ApiProperty({
    type: String,
    name: 'username',
    required: true,
  })
  username: string;
  
  @IsNotEmpty({
    message: '密码不可为空',
  })
  @ApiProperty({
    type: String,
    name: 'password',
    required: true,
  })
  password: string;
}
