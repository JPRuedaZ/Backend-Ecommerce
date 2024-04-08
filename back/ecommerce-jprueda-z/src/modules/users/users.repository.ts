import { Injectable } from "@nestjs/common";
import Users from "src/helpers/users";

@Injectable()
export class UsersRepository {
    private users: Users[] = [
        {
            id: 1,
            email: 'user1@example.com',
            name: 'Juan',
            password: 'password123',
            address: '123 Main Street',
            phone: '1234567890',
          },
          {
            id: 2,
            email: 'user2@example.com',
            name: 'María',
            password: 'password456',
            address: '456 Elm Street',
            phone: '9876543210',
            country: 'Spain',
            city: 'Madrid',
          },
          {
            id: 3,
            email: 'user3@example.com',
            name: 'Pedro',
            password: 'password789',
            address: '789 Oak Street',
            phone: '5555555555',
            country: 'Mexico',
          },
          {
            id: 4,
            email: 'user4@example.com',
            name: 'Ana',
            password: 'passwordabc',
            address: '101 Pine Street',
            phone: '1111111111',
            country: 'USA',
            city: 'New York', 
          },
          {
            id: 5,
            email: 'user5@example.com',
            name: 'Luisa',
            password: 'passwordxyz',
            address: '202 Cedar Street',
            phone: '9999999999',
            country: 'Canada',
          }
    ];
    async getUsers() {
        return this.users
    }
    async getUserByEmail(email: string) {
      return await this.users.find((user) => user.email === email);
    }
    async getUserById(id: number) {
      return this.users.find((user) => user.id === id);
  }
  
  async createUser(user: Users) {
    const id = this.users.length + 1;
    this.users = [...this.users,{id,...user}];
    return {id,...user}
  }
  async updateUserById(id: number, user: Users) {
    const index = this.users.findIndex((user) => user.id === id);
    this.users[index] = {id,...user };
  }
  deleteUserById(id: number) {
    const index = this.users.findIndex((user) => user.id === id);
    const deleteUser =this.users.splice(index, 1);
    return deleteUser;
}
}