import { Body, Controller, Get, Post} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LoginUserDto } from "src/dtos/LoginUserDto.dto";


@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Get()
    getAuth() {
        return this.authService.getAuth();
    }
    @Post('signin')
    signIn(@Body() credential: LoginUserDto) {
        return this.authService.signIn(credential);
    }


}