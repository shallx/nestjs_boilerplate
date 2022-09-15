import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './services/users/users.service';
import { UsersMiddleware } from './middleware/users.middleware';
import { AnotherMiddleware } from './middleware/another.middleware';
@Module({
  controllers: [UsersController],
  providers: [UsersService],
})
// This setup is required for Setting up Middleware consumer
export class UsersModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(UsersMiddleware)
      .forRoutes(UsersController) // .forRoutes('users') can also be used
      .apply(AnotherMiddleware).forRoutes({
        path: 'users/:id',
        method: RequestMethod.GET,
      })
    // Middleware can also be chained to same route
    // Middleware can also be applied to multiple routes
  }
}
