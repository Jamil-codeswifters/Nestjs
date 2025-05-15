import {
  CanActivate,
  ExecutionContext,
  Injectable,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { BlogService } from 'src/blog/blog.service';
import { IS_PUBLIC_KEY } from 'src/common/decorater/public.decorater';

@Injectable()
export class AuthorGuard implements CanActivate {
  constructor(
    private readonly blogService: BlogService,
    private reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {

    console.log(".............")
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const request = context.switchToHttp().getRequest();

    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    console.log(isPublic);
    if (isPublic) {
      return true;
    }

    const userName = request.headers['username'] as string;
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
