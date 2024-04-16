import {
    ValidatorConstraint,
    ValidatorConstraintInterface,
    ValidationArguments
} from 'class-validator';

@ValidatorConstraint({ name: 'confirmPasswords', async: false })
export class confirmPasswords implements ValidatorConstraintInterface {
    validate(password: string, args: ValidationArguments) {
        if(password !== (args.object as any)[args.constraints[0]]) {
            return false;
        }
        return true;
    }
    defaultMessage(args: ValidationArguments){
        return 'Passwords must match';
    }
}