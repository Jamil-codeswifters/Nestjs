import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BlogModule } from './blog/blog.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { LoggerMiddleware } from './middleware/logger.middleware';
import { Sequelize } from 'sequelize-typescript';
import { UserController } from './user/user.controller';
import { UserModule } from './user/user.module';

const devConfig = {
  port: 3000,
};

const prodConfig = {
  port: 8080,
};

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '123',
      database: 'crud',
      autoLoadModels: true,
      synchronize: true,
      logging: console.log,
    }),
    BlogModule,
    UserModule,
  ],
  controllers: [AppController, UserController],
  providers: [
    AppService,
    {
      provide: 'config',
      useFactory: () => {
        return process.env.NODE_ENV === 'production' ? prodConfig : devConfig;
      },
    },
  ],
})
export class AppModule implements NestModule {
  constructor(private readonly sequelize: Sequelize) {
    this.checkDatabaseConnection();
  }

  async checkDatabaseConnection() {
    try {
      await this.sequelize.authenticate();
      console.log('✅ Database connection has been established successfully.');
    } catch (error) {
      console.error('❌ Unable to connect to the database:', error);
    }
  }

  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
