import { BadRequestException, ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/entities/User.entity";
import { Repository } from "typeorm";
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersRepository {
    constructor(@InjectRepository(User) private usersRepository: Repository<User>) {}

    async getUsers(page: number, limit: number): Promise <Partial<User>[]> {
      let users = await this.usersRepository.find();

      const init = (page - 1) * limit;
      const end = init + limit;
      users= users.slice(init, end);
        return users;
        
    }
    async getUserByEmail(email: string): Promise <Partial<User>> {
      const userEmailFound = await this.usersRepository.findOne({where: {email: email}});
      return userEmailFound;
    }
    async getUserById(id: string): Promise <Partial<User>> {
     const user = await this.usersRepository.findOne({where: {id: id}, relations: {orders: true}});
     if(!user ) throw new NotFoundException(`User with ID: ${id} not found`);
     return user;
  }
  
  async createUser(user: Partial<User>): Promise <Partial<User>> {
    const userFound = await this.usersRepository.findOneBy({email: user.email});
    if(userFound) throw new BadRequestException(`User already exists`);
    const newUser = await this.usersRepository.save(user);
    return newUser;
  }
  async updateUserById(id: string, user: Partial<User>): Promise <Partial<User>> {
    const {isAdmin} = user;
        if(isAdmin) throw new ConflictException('Admin cannot be updated');
   const userFound = await this.usersRepository.findOneBy({id: id});
    if(!userFound) {
       throw new NotFoundException(`User with ID: ${id} not exists`);
    } 
    if(user.password) {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        
        user = {...user, password: hashedPassword};
        await this.usersRepository.update({id: id}, {...user});
    } else {
      await this.usersRepository.update({id: id}, {...user});
    }
    
    
    const updatedUser = await this.usersRepository.findOneBy({id: id});
    return updatedUser;
    
    
  }
  async deleteUserById(id: string) : Promise <string> {
    await this.usersRepository.delete({id: id});
    
    return `Se ha borrado el usuario : ${id}`;
}
}