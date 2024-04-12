import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/entities/User";
import { Repository } from "typeorm";

@Injectable()
export class UsersRepository {
    constructor(@InjectRepository(User) private usersRepository: Repository<User>) {}
    async getUsers(page: number, limit: number) {
      let users = await this.usersRepository.find();

      const init = (page - 1) * limit;
      const end = init + limit;
      users= users.slice(init, end);
        return users;
        
    }
    async getUserByEmail(email: string) {
      return await this.usersRepository.find({where: {email: email}});
    }
    async getUserById(id: string) {
     const user = await this.usersRepository.find({where: {id: id}, relations: {orders: true}});
     if(!user) throw new Error('User not found');
     return user;
  }
  
  async createUser(user: User): Promise<User> {
    const newUser = await this.usersRepository.save(user);
    return newUser;
  }
  async updateUserById(id: string, user: User) {
   const updateUser = await this.usersRepository.update({id: id}, user);
   return updateUser;
    
  }
  deleteUserById(id: string) {
    const deleteUser = this.usersRepository.delete({id: id});
    return deleteUser;
}
}