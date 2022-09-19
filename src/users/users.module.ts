import { Module } from '@nestjs/common';
import { ControllersController } from './controllers/controllers.controller';
import { UserController } from './controller/user/user.controller';
import { UsersController } from './controller/users/users.controller';

@Module({
  controllers: [ControllersController, UserController, UsersController]
})
export class UsersModule {}
