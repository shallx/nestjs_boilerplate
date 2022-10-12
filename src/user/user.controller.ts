import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User } from '@prisma/client';
import { Request } from 'express';
import { GetUser } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guard';

@Controller('users') // this creates a route /users
export class UserController {
    @UseGuards(JwtGuard)
    @Get('me')
    // getMe(@GetUser('email') user: User){
    getMe(@GetUser() user: User){ // optionaly pass 'email' to Getuser to get only user
        return user; // req.user comes from jwt.strategy.ts, whatever is passed by validate method
    }
}
