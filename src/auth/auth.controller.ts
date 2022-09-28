import { Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService){}

    @Post('signup')
    signup(){
        return "I just signed up";
    }

    @Post('signin')
    signin(){
        return "I just signed in";
    }
}