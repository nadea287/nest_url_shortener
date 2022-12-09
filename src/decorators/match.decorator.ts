import {
    registerDecorator,
    ValidationArguments,
    ValidationOptions,
    ValidatorConstraint,
    ValidatorConstraintInterface
} from "class-validator";

export function Match(property: string, validationOptions?: ValidationOptions) {
    return (object: any, propertyName: string) => {
        registerDecorator({
            target: object.constructor,
            propertyName,
            constraints: [property],
            validator: MatchConstraint
        })
    }
}

@ValidatorConstraint({name: 'Match'})
export class MatchConstraint implements ValidatorConstraintInterface {
    defaultMessage(validationArguments?: ValidationArguments): string {
        return "passwords don't match";
    }

    validate(value: any, validationArguments?: ValidationArguments): Promise<boolean> | boolean {
        const [relatedPropertyName] = validationArguments.constraints
        const relatedValue = (validationArguments.object as any)[relatedPropertyName]
        return value === relatedValue;
    }

}