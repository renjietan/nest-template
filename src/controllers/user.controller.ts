import { InjectRepository } from '@nestjs/typeorm';
import {
  Controller,
  Get,
  Session,
  Res,
  UseGuards,
  Post,
  Param,
  Query,
} from '@nestjs/common';
import { UserService } from '../services/user.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { RecordDto } from 'src/Dto/record.dto';
import { isNoAuth } from 'src/utils/decorator/jwt.decorator';
import { RecordListDto } from 'src/Dto/recordList.dto';

@Controller({
  version: '1.0',
  path: 'user',
})
@ApiTags('用户管理')
export class UserController {
  constructor(private readonly userService: UserService) {}


  
  @isNoAuth()
  @ApiOperation({
    description: '新增操作记录'
  })
  @Post('record')
  async addRecord(@Query() param: RecordDto) {
    console.log(param);
    
    return await this.userService.addRecord(param);
  }

  @isNoAuth()
  @ApiOperation({
    description: '获取曹祖记录'
  })
  @Post('getRecordList')
  async getRecordList(@Query() param: RecordListDto) {
    return await this.userService.getRecordList(param)
  }



  @UseGuards(AuthGuard('jwt'))
  @Get('getCode')
  getCode(@Session() session, @Res() res) {
    const svgCode = this.userService.getCode();
    session.code = svgCode.text;
    res.type('image/svg+xml');
    res.send(svgCode.data);
  }
}
