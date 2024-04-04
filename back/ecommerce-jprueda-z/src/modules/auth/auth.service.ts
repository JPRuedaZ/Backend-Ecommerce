import { Injectable } from "@nestjs/common";

@Injectable()
export class AuthService {
    getAuth() {
        return 'You are Authenticated!';
    }
}