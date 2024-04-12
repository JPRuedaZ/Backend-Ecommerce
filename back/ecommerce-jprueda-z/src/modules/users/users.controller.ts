import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards, UseInterceptors } from "@nestjs/common";
import { UsersService } from "./users.service";
import { PasswordRemoveInterceptor } from "src/interceptors/password-return.interceptor";
import { AuthGuard } from "src/guards/auth.guard";
import { User } from "src/entities/User";

@Controller('users')
export class UsersController {
    constructor (private readonly usersService: UsersService) {}
    @Get()
    @UseInterceptors(PasswordRemoveInterceptor)
    @UseGuards(AuthGuard)
    getUsers(@Query('page') page=1, @Query('limit') limit=5) {
        return this.usersService.getUsers(Number(page) , Number( limit));
    }
    @Get(':id')
    @UseInterceptors(PasswordRemoveInterceptor)
    @UseGuards(AuthGuard)
    getUserbyId(@Param('id') id: string) {
    return this.usersService.getUserById((id));
    }

    @Post()
    @UseInterceptors(PasswordRemoveInterceptor)
    createUser(@Body() user: User) {
        return this.usersService.createUser(user);
    }

    @Put(":id")
    @UseInterceptors(PasswordRemoveInterceptor)
    @UseGuards(AuthGuard)
    updateUser(@Param('id') id: string, @Body() user: User) {
    return this.usersService.updateUserById((id), user);
    }
    @Delete(':id')
    @UseInterceptors(PasswordRemoveInterceptor)
    @UseGuards(AuthGuard)
    deleteUser(@Param('id') id: string) {
        return this.usersService.deleteUserById((id));
    }
}

