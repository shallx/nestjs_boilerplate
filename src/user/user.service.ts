import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { EditUserDto } from './dto';

@Injectable()
export class UserService {
    constructor(private prisma: PrismaService){
    }

    async editUser(id: number, dto: EditUserDto){
        const user = await this.prisma.user.update({
            where: {
                id: id
            },
            data: {
                ...dto
            }
        })
        if(user) delete user.password;
        return user;
    }
}
