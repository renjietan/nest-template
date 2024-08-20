import { Module } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { UserController } from '../controllers/user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/entities/user.entity';
import { RecordEntyty } from 'src/entities/record.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, RecordEntyty])],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService]
})
export class UserModule {}
