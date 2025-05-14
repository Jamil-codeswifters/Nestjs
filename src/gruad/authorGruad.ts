import {
  CanActivate,
  ExecutionContext,
  Injectable,
  ForbiddenException,
} from '@nestjs/common';
import { BlogService } from 'src/blog/blog.service';
@Injectable()
export class AuthorGuard implements CanActivate {
  constructor(private readonly blogService: BlogService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const blogId = request.params.id;
    console.log(user, blogId);

    const blog: { author: string } | null =
      await this.blogService.findOneById(blogId);

    if (!blog) {
      throw new ForbiddenException('Blog post not found');
    }

    if (blog?.author !== user?.username) {
      throw new ForbiddenException('You are not the author of this post');
    }

    return false;
  }
}
