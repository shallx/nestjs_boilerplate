import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
    private fakeUsers = [{ username: "anson", email: 'anson@anso'}]

    fetchUsers(){
        return this.fakeUsers;
    }
}
 