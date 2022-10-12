import { Body, Controller, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { SignUpDto } from "./dto";

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService){}

    
    @Post('signup')
    signup(@Body() authDto: SignUpDto){
        return this.authService.signup(authDto)
    }

    @HttpCode(HttpStatus.OK) // Optional, used to change status code
    @Post('signin')
    signin(@Body() authDto: SignUpDto){
        return this.authService.login(authDto);
    }

}