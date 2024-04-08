import { Body, Controller, Get, Post} from "@nestjs/common";
import { AuthService } from "./auth.service";
import Credentials from "src/helpers/credentials";


@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Get()
    getAuth() {
        return this.authService.getAuth();
    }
    @Post('signin')
    signIn(@Body() credential: Credentials) {
        return this.authService.signIn(credential);
    }


}