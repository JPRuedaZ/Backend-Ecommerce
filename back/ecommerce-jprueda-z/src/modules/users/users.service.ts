import { Injectable } from "@nestjs/common";
import { UsersRepository } from "./users.repository";
import Users from "src/helpers/users";

@Injectable()
export class UsersService {
    constructor(private usersRepository: UsersRepository){}
    getUsers() {
        return this.usersRepository.getUsers()
    }
    getUserById(id: number) {
        return this.usersRepository.getUserById(id);
    }
    createUser(user: Users) {
        return this.usersRepository.createUser(user);
    }
    updateUserById(id: number, user: Users) {
        return this.usersRepository.updateUserById(id, user);
    }
    deleteUserById(id: number) {
        return this.usersRepository.deleteUserById(id);
    }
}