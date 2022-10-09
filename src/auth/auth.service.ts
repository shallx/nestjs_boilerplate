import { ForbiddenException, HttpException, Injectable } from "@nestjs/common";
import { hash } from "argon2";
import { SignUpDto } from "./dto";
import { PrismaService } from "src/prisma/prisma.service";
import { Prisma, User } from "@prisma/client";
import * as argon from 'argon2';

@Injectable()
export class AuthService {

    constructor(private prisma: PrismaService){} // Auto injected Globaly
    
    async login(dto: SignUpDto) {
        // Find user
        const user : User = await this.prisma.user.findUnique({
            where: {
                email: dto.email,
            }
        })
        
        // If email not found, throw exception
        if(!user) {
            throw new ForbiddenException(
                'User doesn\'nt Exist!'
            )
        }

        // If password doesn't matches
        const pwMatches = await argon.verify(user.password, dto.password)
        if(!pwMatches){
            throw new ForbiddenException('Credentials Incorrect');
        }
        delete user.password;
        return user;
        
    }

    async signup(dto: SignUpDto){
        const pass = await hash(dto.password);
        try {
            const user = await this.prisma.user.create({
                data: {
                    email: dto.email,
                    password: pass,
                }
    
            })
            delete user.password;
            return user;
            
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                console.log("THIS IS AN ERROR");
                if (error.code === 'P2002') {
                    throw new ForbiddenException('Email already exists');
                }
            }
            throw new HttpException('Something went wrong', 500);
        }
        
    }
}