import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";


@ValidatorConstraint({ name: 'MatchPassword', async: false })
export class MatchPassword implements ValidatorConstraintInterface {

    // aqui comparamos password con la confirmacion de password
    validate(password: any, args: ValidationArguments): boolean | Promise<boolean> {
        // en caso de no coincidir la contraseña con la constraseña que esta en args.constraints[0] devolvemos falso
        if(password !== (args.object as any) [args.constraints[0]]) return false
        return true
    }

    // si falla la validacion o nos da falso podemos hacer esto:
    defaultMessage( args: ValidationArguments): string {
        return 'The passwords do not match'
    }
}
