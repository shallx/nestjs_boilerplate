import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './services/users/users.service';
import { UsersMiddleware } from './middleware/users.middleware';
@Module({
  controllers: [UsersController],
  providers: [UsersService],
})
// This setup is required for Setting up Middleware consumer
export class UsersModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(UsersMiddleware).forRoutes(UsersController); // .forRoutes('users') can also be used
    // consumer.apply(UsersMiddleware).forRoutes({
    //   path: 'users',
    //   method: RequestMethod.GET,
    // })
  }
}
