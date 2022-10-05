import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { SignUpDto } from "./dto";

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService){}

    @Post('signup')
    signup(@Body() authDto: SignUpDto){
        return "I just signed up";
    }

    @Post('signin')
    signin(){
        return "I just signed in";
    }

}