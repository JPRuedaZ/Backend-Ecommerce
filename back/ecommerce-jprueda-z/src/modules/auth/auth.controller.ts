import { Body, Controller, Get, Post, UseInterceptors} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LoginUserDto } from "src/dtos/LoginUserDto.dto";
import { CreateUserDto } from "src/dtos/CreateUserDto.dto";
import { PasswordRemoveInterceptor } from "src/interceptors/password-return.interceptor";
import { ApiTags } from "@nestjs/swagger";


@ApiTags('Auths')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Get()
    getAuth() {
        return this.authService.getAuth();
    }
    @Post('signin')
    @UseInterceptors(PasswordRemoveInterceptor)
    signIn(@Body() credential: LoginUserDto) {
        return this.authService.signIn(credential);
    }

    @Post('signup')
    @UseInterceptors(PasswordRemoveInterceptor)
    signUp(@Body() user: CreateUserDto) {
        return this.authService.signUp(user);
        
    }


}