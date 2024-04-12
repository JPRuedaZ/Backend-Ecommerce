import { BadRequestException, Injectable } from "@nestjs/common";
import { UsersRepository } from "../users/users.repository";
import { LoginUserDto } from "src/dtos/LoginUserDto.dto";

@Injectable()
export class AuthService {
    constructor(private readonly usersRepository: UsersRepository) {}
    getAuth() {
        return 'You are Authenticated!';
    }
    async signIn(credential: LoginUserDto) {
        const {email, password} = credential;
        if(!email || !password) {
            throw new BadRequestException('Email and password are required');
        }
       const userValidation = await this.usersRepository.getUserByEmail(email, password);
       return userValidation;
    }
}