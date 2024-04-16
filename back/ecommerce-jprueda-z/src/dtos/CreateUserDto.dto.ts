import { IsEmail, IsNotEmpty, IsNumber, IsString, Matches, MaxLength, MinLength, Validate } from "class-validator";
import { confirmPasswords } from "src/decorators/confirmPasswords.decorator";


export class CreateUserDto {
    @IsNotEmpty( { message: 'El nombre es requerido' } )
    @IsString({ message: 'El nombre debe ser un string' })
    @MinLength(3, { message: 'El nombre debe tener al menos 3 caracteres' })
    @MaxLength(80 , { message: 'El nombre debe tener como maximo 80 caracteres' })
    name: string;


    @IsNotEmpty( { message: 'El email es requerido' } )
    @IsEmail({}, { message: 'El email no es valido' })
    email: string;

    @IsNotEmpty( { message: 'La contraseña es requerida' } )
    @IsString({ message: 'La contraseña debe ser un string' })
    @MinLength(8, { message: 'La contraseña debe tener al menos 8 caracteres' })
    @MaxLength(15 , { message: 'La contraseña debe tener como maximo 80 caracteres' })
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]$/, {
        message: 'La contraseña debe tener al menos una mayuscula, una minuscula, un numero y un caracter especial'
    })
    password: string;

    @IsNotEmpty()
    @Validate(confirmPasswords, ['password'])
    confirmPassword: string;



    @IsNotEmpty()
    @IsString()
     @MinLength(3)
    @MaxLength(80)
    address: string;

    @IsNotEmpty()
    @IsNumber()
    phone: number;

    @IsNotEmpty()
    @IsString()
    @MinLength(5)
    @MaxLength(20)
    country: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(5)
    @MaxLength(20)
    city: string;
}