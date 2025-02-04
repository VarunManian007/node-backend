import { MiddlewareConsumer, Module } from '@nestjs/common';
import { LogMiddleware } from './middleware/log.middleware';
import { JWTFilterMiddleware } from './middleware/jwt-filter.middleware';
import { UserController } from './controller/user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserService } from './services/user.services';
import { UserModule } from './module/user.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env'],
      isGlobal: true,
      cache: true,
    }),
    MongooseModule.forRoot(process.env.DB_URI ?? ''),
    UserModule
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LogMiddleware).forRoutes('*');
    consumer.apply(JWTFilterMiddleware).exclude('/user/register', '/user/login').forRoutes('*');
  }
}
