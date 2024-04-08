import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards, UseInterceptors } from "@nestjs/common";
import { UsersService } from "./users.service";
import Users from "src/helpers/users";
import { PasswordRemoveInterceptor } from "src/interceptors/password-return.interceptor";
import { AuthGuard } from "src/guards/auth.guard";

@Controller('users')
export class UsersController {
    constructor (private readonly usersService: UsersService) {}
    @Get()
    @UseInterceptors(PasswordRemoveInterceptor)
    @UseGuards(AuthGuard)
    getUsers() {
        return this.usersService.getUsers();
    }
    @Get(':id')
    @UseInterceptors(PasswordRemoveInterceptor)
    @UseGuards(AuthGuard)
    getUserbyId(@Param('id') id: string) {
    return this.usersService.getUserById(Number(id));
    }

    @Post()
    @UseInterceptors(PasswordRemoveInterceptor)
    createUser(@Body() user: Users) {
        return this.usersService.createUser(user);
    }

    @Put(":id")
    @UseGuards(AuthGuard)
    updateUser(@Param('id') id: string, @Body() user: Users) {
    return this.usersService.updateUserById(Number(id), user);
    }
    @Delete(':id')
    @UseGuards(AuthGuard)
    deleteUser(@Param('id') id: string) {
        return this.usersService.deleteUserById(Number(id));
    }
}

