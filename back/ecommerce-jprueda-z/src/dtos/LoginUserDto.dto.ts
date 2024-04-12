import { PickType } from "@nestjs/swagger";
import { CreateUserDto } from "./CreateUserDto.dto";



export class LoginUserDto extends PickType(CreateUserDto, ['email', 'password']) {}