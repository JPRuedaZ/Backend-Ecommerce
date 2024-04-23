import { Injectable } from "@nestjs/common";
import { UsersRepository } from "./users.repository";
import { User } from "src/entities/User.entity";

@Injectable()
export class UsersService {
    constructor(private usersRepository: UsersRepository){}
    getUsers(page: number, limit: number): Promise <Partial<User>[]> {
        return this.usersRepository.getUsers(page, limit);
    }
    getUserById(id: string): Promise <Partial<User>> {
        return this.usersRepository.getUserById(id);
    }
    createUser(user: Partial<User>): Promise <Partial<User>> {
        return this.usersRepository.createUser(user);
    }
    updateUserById(id: string, user: Partial<User>) {
        return this.usersRepository.updateUserById(id, user);
    }
    deleteUserById(id: string): Promise <string> {
        return this.usersRepository.deleteUserById(id);
    }
}