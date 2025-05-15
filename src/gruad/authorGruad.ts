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
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const request = context.switchToHttp().getRequest();

    const userName = request.headers['username'] as string;
    console.log(userName);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const blogId = request.params.id;

    if (!userName) {
      throw new ForbiddenException('User not authenticated');
    }

    const blogIdNum = Number(blogId);
    if (isNaN(blogIdNum)) {
      throw new ForbiddenException('Invalid blog ID');
    }

    const blogInstance = await this.blogService.findOneById(blogIdNum);

    if (!blogInstance) {
      throw new ForbiddenException('Blog post not found');
    }

    if (blogInstance?.author !== userName) {
      throw new ForbiddenException('You are not the author of this post');
    }

    return true;
  }
}
