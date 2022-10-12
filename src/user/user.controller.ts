import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { JwtGuard } from 'src/auth/guard';

@Controller('users') // this creates a route /users
export class UserController {
    @UseGuards(JwtGuard)
    @Get('me')
    getMe(@Req() req: Request){
        return req.user; // req.user comes from jwt.strategy.ts, whatever is passed by validate method
    }
}
