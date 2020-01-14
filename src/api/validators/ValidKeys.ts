import {
    ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface
} from 'routing-controllers/node_modules/class-validator';
import {
    registerDecorator
} from 'routing-controllers/node_modules/class-validator/register-decorator';

@ValidatorConstraint({ name: 'ValidKeys' })
export class ValidKeysConstraint implements ValidatorConstraintInterface {
    public validate(property: {}, args: ValidationArguments): boolean {
        const objectKeys: string[] = Object.keys(property);
        const validKeys: Set<string> = new Set(...args.constraints);
        return objectKeys.every(key => validKeys.has(key));
    }

    public defaultMessage(args: ValidationArguments): string {
        return `${args.property} must only accept the next operators ${args.constraints}`;
    }
}

export const ValidKeys = (property: {}, validationOptions?: ValidationOptions): any =>
    (object: object, propertyName: string): void => {
        registerDecorator({
            target: object.constructor,
            propertyName,
            options: validationOptions,
            constraints: [property],
            validator: ValidKeysConstraint,
        });
    };
