import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateUserDto } from "src/dtos/CreateUserDto.dto";
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
    async getUserByEmail(email: string, password: string) {
      const userEmailFound = await this.usersRepository.findOne({where: {email: email, password: password}});
      if(!userEmailFound) throw new NotFoundException(`User not found`);
      return userEmailFound;
    }
    async getUserById(id: string) {
     const user = await this.usersRepository.findOne({where: {id: id}, relations: {orders: true}});
     if(!user ) throw new NotFoundException(`User with ID: ${id} not found`);
     return user;
  }
  
  async createUser(user: CreateUserDto): Promise<string> {
    const userFound = await this.usersRepository.findOneBy({email: user.email});
    if(userFound) throw new BadRequestException(`User already exists`);
    const newUser = await this.usersRepository.save(user);
    return newUser.id;
  }
  async updateUserById(id: string, user: CreateUserDto) {
    const userFound = await this.usersRepository.findOneBy({id: id});
    if(userFound) {
      return await this.usersRepository.update({id: id}, user);
    } else {
      throw new NotFoundException(`User with ID: ${id} not exists`);
    }

    
  }
  deleteUserById(id: string) {
    const deleteUser = this.usersRepository.delete({id: id});
    return deleteUser;
}
}