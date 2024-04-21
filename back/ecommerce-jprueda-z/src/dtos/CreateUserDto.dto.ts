import { ApiHideProperty } from "@nestjs/swagger";
import { IsEmail, IsEmpty, IsNotEmpty, IsNumber, IsString, Matches, MaxLength, MinLength, Validate } from "class-validator";
import { confirmPasswords } from "src/decorators/confirmPasswords.decorator";


export class CreateUserDto {
    /**
     * @example 'Juan Antonio'
     */
    @IsNotEmpty( { message: 'El nombre es requerido' } )
    @IsString({ message: 'El nombre debe ser un string' })
    @MinLength(3, { message: 'El nombre debe tener al menos 3 caracteres' })
    @MaxLength(80 , { message: 'El nombre debe tener como maximo 80 caracteres' })
    name: string;

    /**
     * Debe ser un email valido
     * @example 'juananto10@gmail.com'
     */
    @IsNotEmpty( { message: 'El email es requerido' } )
    @IsEmail({}, { message: 'El email no es valido' })
    email: string;

    /**
     * Debe ser una contraseña debe contener al menos una mayuscula, una minuscula, un numero y un caracter especial
     * @example 'Janto123*'
     */
    @IsNotEmpty( { message: 'La contraseña es requerida' } )
    @IsString({ message: 'La contraseña debe ser un string' })
    @MinLength(8, { message: 'La contraseña debe tener al menos 8 caracteres' })
    @MaxLength(15 , { message: 'La contraseña debe tener como maximo 80 caracteres' })
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]*$/, {
        message: 'La contraseña debe tener al menos una mayuscula, una minuscula, un numero y un caracter especial'
    })
    password: string;

    /**
     * La contraseña debe ser igual a la anterior
     * @example 'Janto123*'
     */
    @IsNotEmpty()
    @Validate(confirmPasswords, ['password'])
    confirmPassword: string;

    /**
     * La direccion debe ser de 3 a 80 caracteres
     * @example '456 Elm Street'
     */
    @IsNotEmpty()
    @IsString()
     @MinLength(3)
    @MaxLength(80)
    address: string;

    /**
     * Debe ser un numero
     * @example '987654'
     */
    @IsNotEmpty()
    @IsNumber()
    phone: number;

    /**
     * 
     * @example 'Colombia'
     */
    @IsNotEmpty()
    @IsString()
    @MinLength(5)
    @MaxLength(20)
    country: string;

    /**
     * @example 'Medellin'
     */
    @IsNotEmpty()
    @IsString()
    @MinLength(5)
    @MaxLength(20)
    city: string;

    /**
     * This is not included in the body request. Aims to false by default.
     * @default false
     */
    @ApiHideProperty()
    @IsEmpty()
    isAdmin?: boolean;

}