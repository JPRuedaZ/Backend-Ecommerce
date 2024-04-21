import { Body, Controller, Delete, Get, Param, ParseUUIDPipe,Put, Query, UseGuards, UseInterceptors } from "@nestjs/common";
import { UsersService } from "./users.service";
import { PasswordRemoveInterceptor } from "src/interceptors/password-return.interceptor";
import { AuthGuard } from "src/guards/auth.guard";
import { CreateUserDto } from "src/dtos/CreateUserDto.dto";
import { Roles } from "src/decorators/roles.decorator";
import { Role } from "src/utils/roles.enum";
import { RolesGuard } from "src/guards/roles.guard";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";

@ApiTags('Users')
@Controller('users')
export class UsersController {
    constructor (private readonly usersService: UsersService) {}
    @ApiBearerAuth()
    @Get()
    @Roles(Role.ADMIN)
    @UseInterceptors(PasswordRemoveInterceptor)
    @UseGuards(AuthGuard, RolesGuard)
    getUsers(@Query('page') page:number=1, @Query('limit') limit:number=5) {
        return this.usersService.getUsers(Number(page) , Number( limit));
    }
    @ApiBearerAuth()
    @Get(':id')
    @UseInterceptors(PasswordRemoveInterceptor)
    @UseGuards(AuthGuard)
    getUserbyId(@Param('id', ParseUUIDPipe) id: string) {
    return this.usersService.getUserById((id));
    }

    @ApiBearerAuth()
    @Put(":id")
    @UseInterceptors(PasswordRemoveInterceptor)
    @UseGuards(AuthGuard)
    updateUser(@Param('id', ParseUUIDPipe) id: string, @Body() user: CreateUserDto) {
    return this.usersService.updateUserById((id), user);
    }
    
    @ApiBearerAuth()
    @Delete(':id')
    @UseInterceptors(PasswordRemoveInterceptor)
    @UseGuards(AuthGuard)
    deleteUser(@Param('id',ParseUUIDPipe) id: string) {
        return this.usersService.deleteUserById((id));
    }
}

