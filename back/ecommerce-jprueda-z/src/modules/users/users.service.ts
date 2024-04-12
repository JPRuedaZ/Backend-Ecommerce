import { Injectable } from "@nestjs/common";
import { UsersRepository } from "./users.repository";
import { CreateUserDto } from "src/dtos/CreateUserDto.dto";

@Injectable()
export class UsersService {
    constructor(private usersRepository: UsersRepository){}
    getUsers(page: number, limit: number) {
        return this.usersRepository.getUsers(page, limit);
    }
    getUserById(id: string) {
        return this.usersRepository.getUserById(id);
    }
    createUser(user: CreateUserDto) {
        return this.usersRepository.createUser(user);
    }
    updateUserById(id: string, user: CreateUserDto) {
        return this.usersRepository.updateUserById(id, user);
    }
    deleteUserById(id: string) {
        return this.usersRepository.deleteUserById(id);
    }
}