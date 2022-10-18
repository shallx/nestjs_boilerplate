import { Body, Controller, Get, Patch, Req, UseGuards } from '@nestjs/common';
import { User } from '@prisma/client';
import { GetUser } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guard';
import { EditUserDto } from './dto';
import { UserService } from './user.service';

@Controller('users') // this creates a route /users
export class UserController {
    constructor(private userService: UserService){}

    @UseGuards(JwtGuard)
    @Get('me')
    // getMe(@GetUser('email') user: User){
    getMe(@GetUser() user: User){ // optionaly pass 'email' to Getuser to get only user
        return user; // req.user comes from jwt.strategy.ts, whatever is passed by validate method
    }

    @UseGuards(JwtGuard)
    @Patch()
    editUser(@GetUser('id') id: number, @Body() dto: EditUserDto){
        return this.userService.editUser(id, dto);
    }
}
