import { Module } from '@nestjs/common';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './typeorm/entities/User';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    // TypeOrmModule maynot always auto import
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'node_nestjs_crash2',
      entities: [User],
      synchronize: true, // synchronize will create table automatically if needed
    }),
    UsersModule,
  ], // This maynot Auto import always
  controllers: [/* AppController */],
  providers: [/* AppService */],
})
export class AppModule {}
