import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { BlogService } from './blog.service';
import { CreateBlogDto } from './dto/create-blog';
import { Blog } from './blog.entity';
import { AuthorGuard } from 'src/gruad/authorGruad';
import { Public } from 'src/common/decorater/public.decorater';

@Controller('blog')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  @Post('/create')
  async create(@Body() createBlogDto: CreateBlogDto): Promise<Blog> {
    return this.blogService.create(createBlogDto);
  }

  @Get()
  async findAll(): Promise<Blog[]> {
    return this.blogService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Blog> {
    return this.blogService.findOne(+id);
  }

  @UseGuards(AuthorGuard)
  @Public()
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateData: Partial<CreateBlogDto>,
  ): Promise<Blog> {
    return this.blogService.update(+id, updateData);
  }

  @UseGuards(AuthorGuard)
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.blogService.remove(+id);
  }
}
