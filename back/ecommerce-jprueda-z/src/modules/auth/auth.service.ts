import { Injectable } from "@nestjs/common";
import Credentials from "src/helpers/credentials";
import { UsersRepository } from "../users/users.repository";

@Injectable()
export class AuthService {
    constructor(private readonly usersRepository: UsersRepository) {}
    getAuth() {
        return 'You are Authenticated!';
    }
    async signIn(credential: Credentials) {
       const userValidation = await this.usersRepository.getUserByEmail(credential.email);
       if(userValidation) {
               return userValidation;
       }
       return 'User not found';
    }
}