import { Module } from '@nestjs/common';
import { BlogController } from './blog.controller';
import { BlogService } from './blog.service';
import { Sequelize } from 'sequelize';
import { SequelizeModule } from '@nestjs/sequelize';
import { Blog } from './blog.entity';

@Module({
  imports: [SequelizeModule.forFeature([Blog])],
  controllers: [BlogController],
  providers: [BlogService],
})
export class BlogModule {}
