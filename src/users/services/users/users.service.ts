import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
    private fakeUsers = [{ username: "anson", email: 'anson@anso'}]

    fetchUsers(){
        return this.fakeUsers;
    }

    createUser(userDetails: CreateUserType){
        this.fakeUsers.push(userDetails);
        return;
    }

    fetchUserById(id: number){
        return this.fakeUsers[id];
    }
}
 