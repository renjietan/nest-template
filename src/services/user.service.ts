import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RecordDto } from 'src/Dto/record.dto';
import { RecordListDto } from 'src/Dto/recordList.dto';
import { RecordEntyty } from 'src/entities/record.entity';
import { UserEntity } from 'src/entities/user.entity';
import * as svgCaptcha from 'svg-captcha';
import { Between, Brackets, Repository } from 'typeorm';
@Injectable()
export class UserService {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor(
    @InjectRepository(UserEntity) private readonly user: Repository<UserEntity>,
    @InjectRepository(RecordEntyty)
    private readonly record: Repository<UserEntity>,
  ) {}
  getCode() {
    const r = (Math.random() * 255).toFixed();
    const g = (Math.random() * 255).toFixed();
    const b = (Math.random() * 255).toFixed();
    const o = Math.random().toFixed(2);
    const svg = svgCaptcha.create({
      size: 1, //生成几个验证码
      fontSize: 50, //文字大小
      width: 100, //宽度
      height: 34, //高度
      background: `rgba(${r},${g},${b},${o})`, //背景
    });
    return svg;
  }

  getOneUser(username: string, password: string) {
    const u = this.user.findOne({
      where: {
        username,
        password,
      },
    });
    return u;
  }

  async addRecord(data: RecordDto) {
    console.log(data);

    const r = new RecordEntyty();
    r.name = data.name;
    r.type = data.type;
    r.desc = data.desc;
    r.createBy = data.createBy;
    return await this.record.save(r);
  }

  async getRecordList(data: RecordListDto) {
    console.log(data);

    let qb = this.record.createQueryBuilder('record');
    let pagenum = data?.pageNum ?? 1;
    let pageSize = data?.pageSize ?? 10;
    let res = await qb
      .andWhere(
        new Brackets((qb) => {
          if (!!data.name) {
            return qb.where('record.name like :name', {
              name: `%${data.name}%`,
            });
          }
          return qb;
        }),
      )
      .andWhere(
        new Brackets((qb) => {
          if (!!data.type) {
            return qb.where('record.type = :type', { type: data.type });
          }
          return qb;
        }),
      )
      .andWhere(
        new Brackets((qb) => {
          if (!!data.createBy) {
            return qb.where('record.createBy = :createBy', {
              createBy: data.createBy,
            });
          }
          return qb;
        }),
      )
      // createTime: Between(data.startTime, data.endTime)
      .andWhere(
        new Brackets((qb) => {
          if (!!data.startTime && !!data.endTime) {
            return qb.where(
              'record.createTime BETWEEN :startTime AND :endTime',
              {
                startTime: data.startTime,
                endTime: data.endTime,
              },
            );
          }
          return qb;
        })
      )
      .skip((pagenum - 1) * pageSize)
      .take(pageSize)
      .getManyAndCount();
    return {
      list: res[0],
      total: res[1],
    };
  }
}
