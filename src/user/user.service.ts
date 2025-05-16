import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";

import * as bcrypt from "bcrypt";
import { User } from "./user.entity";
import { CreateUserDto } from "./dto/create-user-dto";
import { promises } from "dns";
import { Blog } from "src/blog/blog.entity";

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
  ) {}

  async register(createUserDto: CreateUserDto): Promise<User> {
    const { email, password, userName } = createUserDto;

    const existingUser = await this.userModel.findOne({ where: { email } });
    if (existingUser) {
      throw new BadRequestException("Email already in use");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    return this.userModel.create({
      email,
      userName,
      password: hashedPassword,
    });
  }

  async getProfile(id: number): Promise<User> {
    const user = await this.userModel.findByPk(id, {
      include: [Blog],
    });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }
}
