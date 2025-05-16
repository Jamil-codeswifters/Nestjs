import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Blog } from "./blog.entity";
import { CreateBlogDto } from "./dto/create-blog";

@Injectable()
export class BlogService {
  constructor(
    @InjectModel(Blog)
    private readonly blogModel: typeof Blog,
  ) {}

  async create(createBlogDto: CreateBlogDto): Promise<Blog> {
    const { title, content, author, userId } = createBlogDto;
    return this.blogModel.create({ title, content, author, userId });
  }

  async findAll(): Promise<Blog[]> {
    try {
      return this.blogModel.findAll();
    } catch (error) {
      throw new HttpException(
        "server error",
        HttpStatus.INTERNAL_SERVER_ERROR,
        { cause: error },
      );
    }
  }

  async findOne(id: number): Promise<Blog> {
    const blog = await this.blogModel.findByPk(id);
    if (!blog) {
      throw new NotFoundException(`Blog with id ${id} not found`);
    }
    return blog;
  }

  async update(
    id: number,
    req: Request,
    updateData: Partial<CreateBlogDto>,
  ): Promise<Blog> {
    try {
      const blog = await this.findOne(id);
      await blog.update(updateData);
      return blog;
    } catch (error) {
      throw new HttpException("server error", HttpStatus.NOT_ACCEPTABLE, {
        cause: error,
      });
    }
  }

  async remove(id: number): Promise<void> {
    try {
      const blog = await this.findOne(id);
      const user = await blog.destroy();
      return user;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      throw new NotFoundException(`Blog with id ${id} not found`);
    }
  }

  async findOneById(id: number): Promise<Blog | null> {
    return await this.blogModel.findByPk(id, {
      raw: true,
    });
  }
}
