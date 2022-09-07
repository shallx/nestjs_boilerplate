import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Req,
  Res,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { CreateUserDto } from './dtos/CreateUser.dto';

@Controller('users')
export class UsersController {
  @Get()
  getUsers(@Query('sortBy') sortBy: string) {
    console.log(sortBy);
    return { user: 'Rafat Rashid Rahi' };
  }

  // @Post()
  // createUsers(@Req() request: Request, @Res() response: Response) {
  //   console.log(request.body);
  //   response.json({ name: 'some name' });
  // }

  @Post()
  createUsers(@Body() userData: CreateUserDto) {
    console.log(userData);
    return {};
  }

  @Get(':id')
  getUserById(@Param('id') id: string) {
    return { id };
  }

  @Get(':id/:postId')
  getPostById(@Param('id') id: string, @Param('postId') postId: string) {
    return { id, postId };
  }
}
