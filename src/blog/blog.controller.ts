import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from "@nestjs/common";
import { AuthGuard } from "src/gruad/auth.gruad";
import { AuthorGuard } from "src/gruad/authorGruad";
import { Blog } from "./blog.entity";
import { BlogService } from "./blog.service";
import { CreateBlogDto } from "./dto/create-blog";

@Controller("blog")
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  @Post("/create")
  async create(@Body() createBlogDto: CreateBlogDto): Promise<Blog> {
    return this.blogService.create(createBlogDto);
  }

  @Get()
  async findAll(): Promise<Blog[]> {
    return this.blogService.findAll();
  }

  @Get(":id")
  async findOne(@Param("id") id: string): Promise<Blog> {
    return this.blogService.findOne(+id);
  }

  @UseGuards(AuthGuard)
  @Put(":id")
  async update(
    @Param("id") id: string,
    @Body() updateData: Partial<CreateBlogDto>,
    @Req() req: Request,
  ): Promise<Blog> {
    return this.blogService.update(+id, req, updateData);
  }

  @UseGuards(AuthorGuard)
  @Delete(":id")
  async remove(@Param("id") id: string): Promise<void> {
    return this.blogService.remove(+id);
  }
}
