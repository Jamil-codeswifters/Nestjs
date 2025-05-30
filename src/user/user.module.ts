import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserService } from './user.service';
import { User } from './user.entity';
import { UserController } from './user.controller';
@Module({
  imports: [SequelizeModule.forFeature([User])],
  controllers:[ UserController ],
  providers: [UserService],
  exports: [UserService,SequelizeModule], 
})
export class UserModule {}
