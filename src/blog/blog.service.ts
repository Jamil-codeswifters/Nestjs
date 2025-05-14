import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Blog } from './blog.entity';
import { CreateBlogDto } from './dto/create-blog';

@Injectable()
export class BlogService {
  constructor(
    @InjectModel(Blog)
    private readonly blogModel: typeof Blog,
  ) {}


  async create(createBlogDto: CreateBlogDto): Promise<Blog> {
    const { title, content, author, tags } = createBlogDto;
    return this.blogModel.create({ title, content, author, tags });
  }

  async findAll(): Promise<Blog[]> {
    return this.blogModel.findAll();
  }


  async findOne(id: number): Promise<Blog> {
    const blog = await this.blogModel.findByPk(id);
    if (!blog) {
      throw new NotFoundException(`Blog with id ${id} not found`);
    }
    return blog;
  }


  async update(id: number, updateData: Partial<CreateBlogDto>): Promise<Blog> {
    const blog = await this.findOne(id);
    await blog.update(updateData);
    return blog;
  }

  async remove(id: number): Promise<void> {
    try {
      const blog = await this.findOne(id);
      const user = await blog.destroy();
      return user;
    } catch (error) {
      throw new NotFoundException(`Blog with id ${id} not found`);
    }
  }
}
