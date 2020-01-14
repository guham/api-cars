import {
    ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface
} from 'routing-controllers/node_modules/class-validator';
import {
    registerDecorator
} from 'routing-controllers/node_modules/class-validator/register-decorator';

@ValidatorConstraint({ name: 'IsPositiveNumberString' })
export class IsPositiveNumberStringConstraint implements ValidatorConstraintInterface {
    public validate(numberString: string, args: ValidationArguments): boolean {
        return Number(numberString) > 0;
    }

    public defaultMessage(args: ValidationArguments): string {
        return `${args.property} must be positive`;
    }
}

export const IsPositiveNumberString = (validationOptions?: ValidationOptions): any =>
    (object: object, propertyName: string): void => {
        registerDecorator({
            target: object.constructor,
            propertyName,
            options: validationOptions,
            constraints: [],
            validator: IsPositiveNumberStringConstraint,
        });
    };
