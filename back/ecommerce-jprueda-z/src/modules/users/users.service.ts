import { Injectable } from "@nestjs/common";
import { UsersRepository } from "./users.repository";
import { User } from "src/entities/User.entity";

@Injectable()
export class UsersService {
    constructor(private usersRepository: UsersRepository){}

    async preLoadUsers(): Promise<void> {
        const users: Partial<User>[] = [
            {
                name: 'Mauricio Jourdan',
                email: 'maurojourdan@gmail.com',
                password: 'Password123*.', // asegúrate de hashear la contraseña en el repositorio
                phone: 123456789,
                country: 'Argentina',
                address: '123 Mendoza St',
                city: 'Buenos Aires',
                isAdmin: true,
            },
            {
                name: 'David Ramirez',
                email: 'davidramirez@hotmail.com',
                password: 'Contra123#.',
                phone: 987654321,
                country: 'Colombia',
                address: '456 El Poblado St',
                city: 'Medellin',
                isAdmin: false,
            },
        ];

        for (const user of users) {
            const existingUser = await this.usersRepository.getUserByEmail(user.email);
            if (!existingUser) {
                await this.usersRepository.createUser(user);
            } else {
                return;
            }
        }
    }
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