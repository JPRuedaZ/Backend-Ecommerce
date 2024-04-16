import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Post, Put, Query, UseGuards, UseInterceptors } from "@nestjs/common";
import { UsersService } from "./users.service";
import { PasswordRemoveInterceptor } from "src/interceptors/password-return.interceptor";
import { AuthGuard } from "src/guards/auth.guard";
import { CreateUserDto } from "src/dtos/CreateUserDto.dto";
import { Roles } from "src/decorators/roles.decorator";
import { Role } from "src/utils/roles.enum";
import { RolesGuard } from "src/guards/roles.guard";

@Controller('users')
export class UsersController {
    constructor (private readonly usersService: UsersService) {}
    @Get()
    @Roles(Role.ADMIN)
    @UseInterceptors(PasswordRemoveInterceptor)
    @UseGuards(AuthGuard, RolesGuard)
    getUsers(@Query('page') page=1, @Query('limit') limit=5) {
        return this.usersService.getUsers(Number(page) , Number( limit));
    }
    @Get(':id')
    @UseInterceptors(PasswordRemoveInterceptor)
    @UseGuards(AuthGuard)
    getUserbyId(@Param('id', ParseUUIDPipe) id: string) {
    return this.usersService.getUserById((id));
    }

    @Post()
    @UseInterceptors(PasswordRemoveInterceptor)
    createUser(@Body() user: CreateUserDto) {
        return this.usersService.createUser(user);
    }

    @Put(":id")
    @UseInterceptors(PasswordRemoveInterceptor)
    @UseGuards(AuthGuard)
    updateUser(@Param('id', ParseUUIDPipe) id: string, @Body() user: CreateUserDto) {
    return this.usersService.updateUserById((id), user);
    }
    @Delete(':id')
    @UseInterceptors(PasswordRemoveInterceptor)
    @UseGuards(AuthGuard)
    deleteUser(@Param('id',ParseUUIDPipe) id: string) {
        return this.usersService.deleteUserById((id));
    }
}

