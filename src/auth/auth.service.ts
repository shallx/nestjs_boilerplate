import { Injectable } from "@nestjs/common";
import { hash } from "argon2";
import { SignUpDto } from "./dto";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class AuthService {

    constructor(private prisma: PrismaService){} // Auto injected Globaly
    
    async login(dto: SignUpDto) {
        
    }

    async signup(dto: SignUpDto){
        const pass = await hash(dto.password);
        const user = await this.prisma.user.create({
            data: {
                email: dto.email,
                password: pass,
            }

        })
        delete user.password;
        return user;
    }
}