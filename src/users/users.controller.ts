import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseBoolPipe,
  ParseIntPipe,
  Post,
  Query,
  Req,
  Res,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { CreateUserDto } from './dtos/CreateUser.dto';
import { UsersService } from './services/users/users.service';
import { IsBoolean, IsOptional } from 'class-validator';
import { GetUserQueryDto } from './dtos/user.validator.dtos';
import { ValidateCreateUserPipe } from './pipes/validate-create-user/validate-create-user.pipe';

@Controller('users')
export class UsersController {

  constructor(private userService: UsersService) {

  }
  @Get()
  getUsers(@Query(new ValidationPipe()) queryParams: GetUserQueryDto) { // ParseBoolPipe here validates query param
    console.log(queryParams.sortDesc);
    return this.userService.fetchUsers();
  }

  // @Post()queryParam
  // createUsers(@Req() request: Request, @Res() response: Response) {
  //   console.log(request.body);
  //   response.json({ name: 'some name' });
  // }

  @Post()
  @UsePipes(new ValidationPipe())
  // createUsers(@Body() userData: CreateUserDto) { // use this if you don't want to transform anything
  createUsers(@Body(ValidateCreateUserPipe) userData: CreateUserDto) { // Use this if u wanna transform & validate
    this.userService.createUser(userData);
    console.log(userData);
    return this.userService.fetchUsers();
  }

  @Get(':id')
  getUserById(@Param('id', ParseIntPipe) id: number) {
    const user = this.userService.fetchUserById(id);
    if(!user) {
      throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
    }
    return user;
  }

  @Get(':id/:postId')
  getPostById(@Param('id', ParseIntPipe) id: number, @Param('postId') postId: string) { // ParseIntPipe validates the id as a number, aslo it typecasts it to number
    return { id, postId };
  }
}
