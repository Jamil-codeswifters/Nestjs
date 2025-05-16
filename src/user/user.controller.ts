import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";
import { GetUser } from "src/common/decorater/getUser";
import { AuthGuard } from "src/gruad/auth.gruad";
import { CreateUserDto } from "./dto/create-user-dto";
import { User } from "./user.entity";
import { UserService } from "./user.service";
import { Public } from "src/common/decorater/public.decorater";

@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post("register")
  register(@Body() dto: CreateUserDto) {
    return this.userService.register(dto);
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  async getProfile(@GetUser() user: { id: number }): Promise<User> {
    return this.userService.getProfile(user.id);
  }
}
