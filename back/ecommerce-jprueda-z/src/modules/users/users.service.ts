import { Injectable } from "@nestjs/common";
import { UsersRepository } from "./users.repository";
import { User } from "src/entities/User";

@Injectable()
export class UsersService {
    constructor(private usersRepository: UsersRepository){}
    getUsers(page: number, limit: number) {
        return this.usersRepository.getUsers(page, limit);
    }
    getUserById(id: string) {
        return this.usersRepository.getUserById(id);
    }
    createUser(user: User) {
        return this.usersRepository.createUser(user);
    }
    updateUserById(id: string, user: User) {
        return this.usersRepository.updateUserById(id, user);
    }
    deleteUserById(id: string) {
        return this.usersRepository.deleteUserById(id);
    }
}