import { Body, Controller, Get, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dtos/CreateUser.dto';
import { UsersService } from 'src/users/services/users/users.service';

@Controller('users')
export class UsersController {
    constructor(private userService: UsersService){}
    @Get()
    getUsers(){
        return this.userService.findUsers();
    }

    @Post()
    @UsePipes(new ValidationPipe())
    createUsers(@Body() createUserDto: CreateUserDto) {
        const { confirmPassword, ...userDetails } = createUserDto;
        return this.userService.createUser(userDetails);
    }

}
