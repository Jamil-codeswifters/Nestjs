import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { BlogService } from './blog.service';
import { CreateBlogDto } from './dto/create-blog';
import { Blog } from './blog.entity';

@Controller('blog')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  // ➕ Create a blog post
  @Post('/create')
  async create(@Body() createBlogDto: CreateBlogDto): Promise<Blog> {
    return this.blogService.create(createBlogDto);
  }

//    Get all blog posts
  @Get()
  async findAll(): Promise<Blog[]> {
    return this.blogService.findAll();
  }


  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Blog> {
    return this.blogService.findOne(+id);
  }


  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateData: Partial<CreateBlogDto>,
  ): Promise<Blog> {
    return this.blogService.update(+id, updateData);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.blogService.remove(+id);
  }
}
