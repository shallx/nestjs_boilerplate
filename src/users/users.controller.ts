import { Controller, Get, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';

@Controller('users')
export class UsersController {
  @Get()
  getUsers() {
    return { user: 'Rafat Rashid Rahi' };
  }

  @Post()
  createUsers(@Req() request: Request, @Res() response: Response) {
    console.log(request.body);
    response.json({ name: 'some name' });
  }
}
