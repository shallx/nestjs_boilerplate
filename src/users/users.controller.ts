import {
  Body,
  Controller,
  Get,
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

@Controller('users')
export class UsersController {

  constructor(private userService: UsersService) {

  }
  @Get()
  getUsers(@Query('sortDesc') sortBy: boolean) { // ParseBoolPipe here validates query param
    console.log(sortBy);
    return this.userService.fetchUsers();
  }

  // @Post()
  // createUsers(@Req() request: Request, @Res() response: Response) {
  //   console.log(request.body);
  //   response.json({ name: 'some name' });
  // }

  @Post()
  @UsePipes(new ValidationPipe())
  createUsers(@Body() userData: CreateUserDto) {
    
    console.log(userData);
    return {};
  }

  @Get(':id')
  getUserById(@Param('id') id: string) {
    return { id };
  }

  @Get(':id/:postId')
  getPostById(@Param('id', ParseIntPipe) id: number, @Param('postId') postId: string) { // ParseIntPipe validates the id as a number, aslo it typecasts it to number
    return { id, postId };
  }
}
