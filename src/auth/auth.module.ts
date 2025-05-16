import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { UserModule } from "src/user/user.module";
import { JwtModule } from "@nestjs/jwt";
import { jwtConstants } from "./contants/jwtSecret";
import { SequelizeModule } from "@nestjs/sequelize";
import { User } from "src/user/user.entity";
import { AuthController } from "./auth.controller";

@Module({
  imports: [
    UserModule,
    SequelizeModule.forFeature([User]),
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      // signOptions: { expiresIn: "100s" },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
