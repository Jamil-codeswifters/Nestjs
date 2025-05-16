import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectModel } from "@nestjs/sequelize";
import { User } from "src/user/user.entity";
import { LoginUserDto } from "./dto/login-dto";
import * as bcrypt from "bcrypt";

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
    private jwtService: JwtService,
  ) {}
  async signIn(loginDto: LoginUserDto): Promise<{ access_token: string }> {
    const user = await this.userModel.findOne({
      where: { email: loginDto.email },
    });
    
    if (!user) {
      throw new UnauthorizedException("Invalid email or password");
    }
    const isPasswordValid: boolean | null = await bcrypt.compare(
      loginDto.password,
      user.dataValues.password,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException();
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const payload = { id: user?.dataValues.id, username: user.dataValues.userName };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
