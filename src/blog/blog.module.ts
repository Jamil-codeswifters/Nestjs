import { Module } from '@nestjs/common';
import { BlogController } from './blog.controller';
import { BlogService } from './blog.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Blog } from './blog.entity';
import { User } from 'src/user/user.entity';

@Module({
  imports: [SequelizeModule.forFeature([User,Blog])],
  controllers: [BlogController],
  providers: [BlogService],
})
export class BlogModule {}
