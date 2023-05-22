import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/typeorm/entities/User';
import { CreateUserParams, UpdateUserParams } from 'src/utils/types';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
    constructor(@InjectRepository(User) private userRepository: Repository<User>) {}

    findUsers() {
        return this.userRepository.find();
    }

    createUser(userDetails: CreateUserParams){
        const user = this.userRepository.create({ // not async
            ...userDetails,
            createdAt: new Date(),
        })
        return this.userRepository.save(user); // is async
    }

    updateUserById(id: number, updateUserDetails: UpdateUserParams) {
        return this.userRepository.update(id, updateUserDetails);
    }

    deleteUser(id: number){
        return this.userRepository.delete(id);
    }
}
