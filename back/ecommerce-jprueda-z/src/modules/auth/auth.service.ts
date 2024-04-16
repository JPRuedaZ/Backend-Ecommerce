import { BadRequestException, Injectable } from "@nestjs/common";
import { UsersRepository } from "../users/users.repository";
import { User } from "src/entities/User";
import * as bcrypt from 'bcrypt';
import {JwtService} from '@nestjs/jwt';
import { Role } from "src/utils/roles.enum";

@Injectable()
export class AuthService {
   
    constructor(private readonly usersRepository: UsersRepository, private readonly jwtService: JwtService) {}
    async getAuth() {
        return 'You are Authenticated!';
    }
    async signIn(credential: Partial<User>) {
       const userValidation = await this.usersRepository.getUserByEmail(credential.email);
       if(!userValidation) {
           throw new BadRequestException('Invalid credentials');
       }
       const isPasswordValid = await bcrypt.compare(credential.password, userValidation.password);
       if(!isPasswordValid) {
           throw new BadRequestException('Invalid credentials');
       }

       const payload = {
           id: userValidation.id,
           email: userValidation.email,
           sub: userValidation.id,
           roles:[userValidation.isAdmin ? Role.ADMIN : Role.USER],
       }
       
       const token = this.jwtService.sign(payload)

       return {
        token,
        message: 'Login Successful',
       }
    }
    async signUp(user: Partial<User>) {
        const {email, password} = user;

        const foundUser = await this.usersRepository.getUserByEmail(email);
        if(foundUser) {
            throw new BadRequestException('User already exists');
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await this.usersRepository.createUser({
            ...user,
            password: hashedPassword,
            
        });
        return newUser;
        
    }
}