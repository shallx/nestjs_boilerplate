import { IsNotEmpty, IsString, IsEmail } from "class-validator";

export class SignUpDto {
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    password: string;
}